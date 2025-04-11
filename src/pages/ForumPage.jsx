import React, { useState, useEffect, useContext } from "react";
import { ForumContext } from "../contexts/ForumContext";
import { PopUpCreateForumForm } from "../components/PopUpCreateForumForm"; 
import "./ForumPage.css";
import "./LandingPage.css"


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
    <div className="section about-section">
    <div className="section-overlay"></div>
    <div className="section-content">
      <h2 className="section-title">Our Forum</h2>
      <div className="about-text">
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
              <img src={topic.image} />
              <p>{topic.description}</p>
              <p><strong>Location:</strong> {topic.location}</p>
              <p><strong>Author:</strong> {topic.author.username ? topic.author.username : "Unknown"}</p> 
              {topic.imageUrl && <img src={topic.imageUrl} alt={topic.title} />}
            </div>
          ))}
        </div>
      ) : (
        <p>No topics available.</p>
        
      )}
    </div>
      </div>
    </div>
    <div className="about-visual">
      <div className="gallery-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="gallery-item"></div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default ForumPage;
