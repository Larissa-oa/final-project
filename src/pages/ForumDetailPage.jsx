import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ForumContext } from "../contexts/ForumContext";
import UpdateForumForm from "../components/UpdateForumForm";

const ForumDetailPage = () => {
  const { id } = useParams(); 
  const { topics } = useContext(ForumContext); 
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    const selectedTopic = topics.find((top) => top._id === id); // Ensure you're using _id
    setTopic(selectedTopic);
  }, [id, topics]);

  if (!topic) {
    return <div>Loading topic details...</div>;
  }

  return (
    <div className="forum-detail-page">
      <div className="forum-detail-content">
        <h1>{topic.title}</h1>
        <div className="forum-details-info">
          <img src={topic.image} alt={topic.title} />
          <p><strong>Description:</strong> {topic.description}</p>
          <p><strong>Author:</strong> {topic.author?.username || "Unknown"}</p>
          <p><strong>Location:</strong> {topic.location.join(', ')}</p> {/* Assuming location is an array */}
        </div>
      </div>
      <UpdateForumForm topic={topic} /> {/* Pass the topic to UpdateForumForm */}
    </div>
  );
};

export default ForumDetailPage;
