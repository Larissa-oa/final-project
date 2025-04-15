import React, { useContext, useEffect, useState } from 'react'
import { Chatbot } from "../components/Chatbot"
import { AuthContext } from '../contexts/AuthContext'
import "./ProfilePage.css"
import mail from "../assets/images/mail-white.png"
import bin from "../assets/images/delete.png"
import { useMessages } from '../contexts/MessageContext'

const ProfilePage = ({ onClose, recipientId, recipientUsername, recipientProfileImage }) => {
  const [message, setMessage] = useState('')
  const { messages, fetchMessages } = useMessages()
  const {currentUser, isLoading} = useContext(AuthContext)

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
      <h3>Check your messages</h3>
<button className="deleteMessage"><img src={bin}  style= {{width:"17px", heigth: "17px"}}/></button>
    </div>
  <div className="fav-plant-card">
    <h2 className="personal-garden">Your Personal Garden</h2>
  </div>
  <div className="user-open-forums">
    <h2>Your Active Forums </h2>
  </div>
  </section>

 
  </div>
  
  )
}

export default ProfilePage
