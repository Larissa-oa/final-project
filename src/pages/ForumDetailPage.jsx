import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ForumContext } from "../contexts/ForumContext";
import UpdateForumForm from "../components/UpdateForumForm";
import "./ForumDetailPage.css"

const ForumDetailPage = () => {
  const { id } = useParams(); 
  const { topics } = useContext(ForumContext); 
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    const selectedTopic = topics.find((top) => top._id === id); // check it after cause Eric said might nor be a good idea 
    setTopic(selectedTopic);
  }, [id, topics]);

  if (!topic) {
    return <div>Something went wrong, try again.</div>;
  }

  return (
    <div className="forum-detail-page">
        <div className="forum-details-info">
          <img src={topic.image} alt="topic-related-image" className="forum-detail-page-img" />
          {topic.author ? (<span className="author-info-detail-page">
                  {topic.author.profileImage ? (
                    <img
                      src={topic.author.profileImage}
                      alt={topic.author.username}
                      style={{
                        width: "45px",
                        height: "40px",
                        borderRadius: "50%",
                      }}
                      className="author-avatar"
                    />
                  ) : (
                    <span >
                      {topic.author.username.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <div className="author-initials-detail-page">
                  {topic.author.username}
                  </div>
                </span>
              ) : (
                "Anonymous"
              )} 
               </div>
          <div className="forum-detail-content">
          <h1>{topic.title}</h1>
          <p>{topic.description}</p>
          
         
          <p>{topic.location.join(', ')}</p> 
        </div>
      <UpdateForumForm topic={topic} /> 
    </div>
  );
};

export default ForumDetailPage;