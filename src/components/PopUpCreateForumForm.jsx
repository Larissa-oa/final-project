import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';   
import { ForumContext } from '../contexts/ForumContext';
import "./PopupCreateForumForm.css"


const PopUpCreateForumForm = ({closeModal}) => {

  const [forumTitle, setForumTitle] = useState("");
  const [forumDescription, setForumDescription] = useState("");
  const [forumLocation, setForumLocation] = useState("");
  const { handleCreateTopic } = useContext(ForumContext);
  const { currentUser } = useContext(AuthContext);
  
  return (
    <div className="forum-body">
  <button className="btn-close" onClick={closeModal}>
             x
            </button>
         
      <h2 className="title-form-create-forum">Sprout a New Forum</h2>
      <form className="form-create-t"
        onSubmit={(e) => {
          e.preventDefault(); 

          const image = e.target.image.files[0];

          handleCreateTopic(e, {
            title: forumTitle, 
            description: forumDescription,
            location: forumLocation,
            image, 
            author: currentUser._id,
            profileImage: currentUser.profileImage,
            createdAt: currentUser.timestamp,
          });

          closeModal()
        }}
      >
        <label className="label-form">
          Title:
          <input
            type="text"
            value={forumTitle}
            onChange={(e) => setForumTitle(e.target.value)} 
            className="input-form"
          />
        </label>

        <label className="label-form">
          Description:
          <input
            type="text"
            value={forumDescription}
            onChange={(e) => setForumDescription(e.target.value)} 
            className="input-form"
            />
           
        </label>

        <label className="label-form">
          Location:
          <input
            type="text"
            value={forumLocation}
            onChange={(e) => setForumLocation(e.target.value)} 
            className="input-form"
            />
            
        </label>

        <label className="label-form">
          Image:
          <input
            type="file"
            name="image"
            className="input-form"
            />
            
        </label>
      <div className="align-btn">
        <button type="submit" className="submite-create-forum-btn">Let's get it started</button>
        </div>
      </form>
    </div>
  );
};

export { PopUpCreateForumForm }
