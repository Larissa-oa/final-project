import axios from "axios";
import React, { useContext, useState } from "react";

export const MessageContext = React.createContext();

export const useMessages = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/message/inbox`);
    setMessages(res.data);
  };

  const sendMessage = async (recipientId, messageBody) => {
    await axios.post(`${import.meta.env.VITE_API_URL}/message/send`, { recipientId, messageBody });
  };

  const deleteMessage = async (id) => {
    setMessages((prev) => prev.filter((msg) => msg._id !== id));
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
