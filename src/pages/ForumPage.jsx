import React, { useState, useEffect, useContext } from "react";
import { ForumContext } from "../contexts/ForumContext";
import { PopUpCreateForumForm } from "../components/PopUpCreateForumForm"; 
import "./ForumPage.css";
import bin from "../assets/images/delete.png"
import { Link } from "react-router-dom";
import { useFavorites } from "../contexts/FavoriteContext";


const ForumPage = () => {
  const { topics, getAllTopics, handleDeleteTopic } = useContext(ForumContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("")
  const { addFavorite } = useFavorites();
  const filteredForums = topics?.filter((forum) =>
    forum.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  useEffect(() => {
    getAllTopics();
  }, [getAllTopics]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
    <section className="intro-section-forum-page">
       <button className="btn-create-topic" onClick={handleOpenModal}>
       Root a New Conversation
       </button> <br />
       </section>
       <section className="search-forum-section">
       <label>
       <input 
  type="text"
  className="search-bar-forum-page"
  placeholder="🔍 Search Forums of your interest" 
  onChange={(e) => setSearchTerm(e.target.value)}
  value={searchTerm}/>
       </label>
       <p className="forum-search-quantity">
          {filteredForums.length} {filteredForums.length === 1 ? 'forum' : 'forums'} active
        </p>
       </section>
    <div className="forum-section">
      <div className="forum-text">
      <div className="forum-page">       
  
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <PopUpCreateForumForm  closeModal={handleCloseModal}/> 
          </div>
        </div>
      )}

      
      {filteredForums.length > 0 ? (
        <div className="topics-list">
          {topics.map((topic) => (
            <div key={topic._id} className="topic-card">
              <div className="card-header">              <Link key={topic._id} to = {`/forum/${topic._id}`} className="topic-link">
              <img src={topic.image}  className="forum-card-image"/>
              <h3 className="forum-topic-title">{topic.title}</h3>
              </Link>
           
              <button onClick={() => addFavorite({ ...topic, type: "Forum" })} className="follow-btn">Follow</button>
              <button onClick={() => handleDeleteTopic(topic._id)} className="delete-topic-button"><img src={bin}/></button>
              </div>
              <div className="forum-card-description">
             <p>{topic.description}</p>
             <p id="forum-timestamp-container">
                    {formatTimestamp(topic.createdAt)}
                      </p>
              {topic.author ? (<span className="author-info-main-page">
                  {topic.author.profileImage ? (
                    <img
                      src={topic.author.profileImage}
                      alt={topic.author.username}
                      className="author-avatar-main-page"
                    />
                  ) : (
                    <span className="author-initials-main-page">
                      {topic.author.username.charAt(0).toUpperCase()}
                    </span>
                  )}
                  {topic.author.username}
                </span>
              ) : (
                "Anonymous"
              )} 
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No topics available.</p>
        
      )}
    </div>
      </div>
    </div>
    </>
  );
};

export default ForumPage;
