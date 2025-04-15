import React, { useContext, useEffect, useState } from 'react'
import { Chatbot } from "../components/Chatbot"
import { AuthContext } from '../contexts/AuthContext'
import "./ProfilePage.css"
import mail from "../assets/images/mail-white.png"
import bin from "../assets/images/delete.png"
import { useMessages } from '../contexts/MessageContext'
import CreateMessagePopup from "../components/CreateMessagePopup"

const ProfilePage = () => {
  const [message, setMessage] = useState('')
  const [isPopupOpen, setIsPopupOpen] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);

  const { messages, fetchMessages, deleteMessage } = useMessages()
  const {currentUser} = useContext(AuthContext)

  const openPopup = (sender) => {
    setSelectedUser(sender);
    setIsPopupOpen(true);
  };
  
  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedUser(null);
  };
  

useEffect( () => {
  fetchMessages()
}, [])

  return (
    <div className="profile-page">
    <div className="user-info">
      <img src={currentUser.profileImage} alt="User Avatar" className="user-avatar-img" />
      
      <div className="user-basic-info">
        <p className="username">Hello, {currentUser.username}</p>
        <p className="email">
          <img src={mail} alt="Email Icon" className="mail-to-img" />
          {currentUser.email}
        </p>
      </div>
      <Chatbot />
    </div>

    

    <section className="user-fav-content">
    <div id="user-mail-container">
      <h2>Inbox</h2>
      <span className="mail-message-container">
      {messages.length > 0 ? ( 
        <ul className="message-list">
         {messages.map((currentMessage) => (
          <li key={currentMessage._id} className="message-item">
            <div className="message-container">
            <span className="mail-back-to" onClick={() => openPopup(currentMessage.sender_id)}><img src={currentMessage.sender_id.profileImage} style={{width:"40px", height: "35px", borderRadius: "50%"}}/><strong>{currentMessage.sender_id.username}</strong>, says: </span>
              <p>{currentMessage.message_body}</p>
              <button className="delete-mail-btn" onClick={() => deleteMessage(currentMessage._id)}><img src={bin}  style= {{width:"17px", height: "17px"}}/></button>
            </div>
          </li>
         ))}
        </ul>
      ) : ( <p>No messages yet</p>)}
      </span>
    </div>
  <div className="fav-plant-card">
    <h2 className="personal-garden">Your Personal Garden</h2>
  </div>
  <div className="user-open-forums">
    <h2>Your Active Forums </h2>
  </div>
  </section>
  {selectedUser && (
  <CreateMessagePopup
    isOpen={isPopupOpen}
    onClose={closePopup}
    recipientId={selectedUser._id}
    recipientUsername={selectedUser.username}
    recipientProfileImage={selectedUser.profileImage}
  />
)}
 
  </div>
  
  )
}

export default ProfilePage
