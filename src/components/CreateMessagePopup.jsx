import React, { useState, useContext } from 'react';
import {MessageContext, useMessages } from '../contexts/MessageContext';
import "./CreateMessagePopup.css"
import post from "../assets/images/post.png"
import { AuthContext } from '../contexts/AuthContext';

const CreateMessagePopup = ({ onClose, recipientUsername, recipientId, recipientProfileImage}) => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useMessages();
  const {currentUser} = useContext(AuthContext)
  const senderId= currentUser._id
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() === '') return;
  
    try {
      await sendMessage(recipientId, message);
      setMessage('');
      onClose();
    } catch (error) {
      console.log('Error sending message:', error);
    }
  };
  


  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-btn" onClick={onClose}>X</button>
        <div className="popup-header">
          <img src={recipientProfileImage} className="popup-avatar" />
          <h2>Send a private message to {recipientUsername}</h2>
        </div>
        <div className="aligning-div">
        <form onSubmit={handleSubmit} className="form-send-message">
          <textarea 
            value={message} 
            onChange={handleMessageChange} 
            placeholder="Write your message here..." 
            rows="4" 
            cols="30" 
            className="text-send-dm"
          />
          <button type="submit" className="button-send-message"><img src={post} /></button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMessagePopup;
