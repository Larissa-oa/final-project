import React, { useState, useEffect, useContext } from "react";
import { ForumContext } from "../contexts/ForumContext";
import { PopUpCreateForumForm } from "../components/PopUpCreateForumForm"; 
import "./ForumPage.css";
import "./LandingPage.css"
import { Link } from "react-router-dom";


const ForumPage = () => {
  const { topics, getAllTopics, handleDeleteTopic } = useContext(ForumContext);
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
            <Link key={topic._id} to = {`/forum/${topic._id}`}>
            <div key={topic._id} className="topic-card">
              <h3>{topic.title}</h3>
              <img src={topic.image} />
              <p><strong>Description:</strong>{topic.description}</p>
              <p><strong>Author:</strong> {topic.author ? topic.author.username : "Unknown"}</p> 
            </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No topics available.</p>
        
      )}
    </div>
      </div>
    </div>
    </div>
  );
};

export default ForumPage;
