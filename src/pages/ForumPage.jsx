import React, { useState, useEffect, useContext } from "react";
import { ForumContext } from "../contexts/ForumContext";
import { PopUpCreateForumForm } from "../components/PopUpCreateForumForm"; 
import "./ForumPage.css";


const ForumPage = () => {
  const { topics, getAllTopics } = useContext(ForumContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllTopics();
  }, [getAllTopics]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="forum-page">
      
      <h1>Forum</h1>

      <button className="btn-create" onClick={handleOpenModal}>
      Root a New Conversation
      </button>

  
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="btn-close" onClick={handleCloseModal}>
              &times;
            </button>
            <PopUpCreateForumForm /> 
          </div>
        </div>
      )}

      
      {topics && topics.length > 0 ? (
        <div className="topics-list">
          {topics.map((topic) => (
            <div key={topic._id} className="topic-card">
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
              <p><strong>Location:</strong> {topic.location}</p>
              <p><strong>Author:</strong> {topic.author ? topic.author.username : "Unknown"}</p> 
              {topic.imageUrl && <img src={topic.imageUrl} alt={topic.title} />}
            </div>
          ))}
        </div>
      ) : (
        <p>No topics available.</p>
        
      )}
    </div>
  );
};

export default ForumPage;
