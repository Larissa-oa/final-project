import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const MessageContext = React.createContext();

export const useMessages = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const {currentUser} = useContext(AuthContext)

  console.log("Token in use:", currentUser?.token);
  const fetchMessages = async () => {
  try {
    const response = await axios.get (`${import.meta.env.VITE_API_URL}/message/inbox`, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`
      }
    })
    setMessages(response.data)
  } catch(error) {
    console.log("error fetching messages", error)
  }
  };

  const sendMessage = async (recipientId, messageBody) => {
    if (!currentUser || !currentUser.token) {
      console.error("User not authenticated");
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/message/post`,
        {
          recipient_id: recipientId,
          message_body: messageBody,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`, 
          },
        }
      );
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };
  

  const deleteMessage = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/message/delete/${id}`,
        {
          headers : {
            Authorization: `Bearer ${currentUser.token}`
          }
        }
      );
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        fetchMessages,
        sendMessage,
        deleteMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};
