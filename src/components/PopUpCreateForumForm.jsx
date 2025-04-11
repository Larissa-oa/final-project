import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';   
import { ForumContext } from '../contexts/ForumContext';

const PopUpCreateForumForm = () => {

  const [forumTitle, setForumTitle] = useState("");
  const [forumDescription, setForumDescription] = useState("");
  const [forumLocation, setForumLocation] = useState("");
  const { handleCreateTopic } = useContext(ForumContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <h2>Sprout a New Forum</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault(); 

          const image = e.target.image.files[0];
          handleCreateTopic(e, {
            title: forumTitle, 
            description: forumDescription,
            location: forumLocation,
            image, 
            author: currentUser._id,
          });
        }}
      >
        <label>
          Title:
          <input
            type="text"
            value={forumTitle}
            onChange={(e) => setForumTitle(e.target.value)} 
          />
        </label>

        <label>
          Description:
          <input
            type="text"
            value={forumDescription}
            onChange={(e) => setForumDescription(e.target.value)} />
        </label>

        <label>
          Location:
          <input
            type="text"
            value={forumLocation}
            onChange={(e) => setForumLocation(e.target.value)} />
        </label>

        <label>
          Image:
          <input
            type="file"
            name="image"/>
        </label>

        <button type="submit">Let's get it started</button>
      </form>
    </div>
  );
};

export { PopUpCreateForumForm };
