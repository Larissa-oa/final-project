import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ForumContext } from "../contexts/ForumContext";
import UpdateForumForm from "../components/UpdateForumForm";
import CreateMessagePopup from "../components/CreateMessagePopup";
import "./ForumDetailPage.css";
import { AuthContext } from "../contexts/AuthContext";

const ForumDetailPage = () => {
  const { id } = useParams();
  const { topics } = useContext(ForumContext);
  const [topic, setTopic] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const selectedTopic = topics.find((top) => top._id === id);
    setTopic(selectedTopic);
  }, [id, topics]);

  const openPopup = (author) => {
    setSelectedUser(author);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedUser(null);
  };

  if (!topic) {
    return <div>Something went wrong, try again.</div>;
  }

  return (
    <div className="forum-detail-page">
      <div className="forum-details-info">
        <img src={topic.image} alt="topic-related-image" className="forum-detail-page-img" />
        {topic.author ? (
          <span id="author-detail-content" onClick={() => openPopup(topic.author)} style={{ cursor: "pointer" }}>
            {topic.author.profileImage ? (
              <img
                src={topic.author.profileImage}
                alt={topic.author.username}
                style={{
                  width: "45px",
                  height: "40px",
                  borderRadius: "50%",
                }}
                className="author-avatar-forum-page"
              />
              
            ) : (
              <span>{topic.author.username.charAt(0).toUpperCase()}</span>
            )}
            <div className="author-initials-detail-page">{topic.author.username}</div>
          </span>
        ) : (
          "Anonymous"
        )}
      </div>
      <div id="forum-detail-content">
        <h1>{topic.title}</h1>
        <p>{topic.description}</p>
        <p>{topic.location.join(", ")}</p>
      </div>
      <UpdateForumForm topic={topic} />
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
  );
};

export default ForumDetailPage;
