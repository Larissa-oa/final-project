import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./UpdateForumForm.css";
import bin from "../assets/images/delete.png";
import post from "../assets/images/post.png";
import { format } from 'date-fns';
import CreateMessagePopup from './CreateMessagePopup';
import mail from "../assets/images/mail.png" 
import { AuthContext } from '../contexts/AuthContext';

const UpdateForumForm = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [replyTopic, setReplyTopic] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [reply, setReply] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const {currentUser, isLoggedIn} = useContext(AuthContext)

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/forum/the-topic/${id}`)
      .then((res) => {
        setTopic(res.data);
        setReply(res.data.reply || []);
      })
      .catch((error) => {
        console.error("Error fetching topic:", error);
      });
  }, [id]);

  const handleAddComment = (e) => {
    e.preventDefault();
    const newReply = {
      text: replyTopic,
      owner: ownerName || "Anonymous",
    };

    const token = localStorage.getItem("authToken");

    axios
      .post(`${import.meta.env.VITE_API_URL}/forum/${id}/reply`, newReply, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setReply(res.data.updatedForum.reply);
        setReplyTopic('');
        setOwnerName('');
      })
      .catch((error) => {
        console.error("Error adding reply:", error);
      });
  };

  const handleDeleteComment = (replyId) => {
    const token = localStorage.getItem("authToken");

    axios
      .delete(`${import.meta.env.VITE_API_URL}/forum/${id}/delete-reply/${replyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setReply((prev) => prev.filter((comment) => comment._id !== replyId));
      })
      .catch((err) => {
        console.error("Error deleting reply:", err);
      });
  };

  const openPopup = (user) => {
    if (user && user.username) {
      setSelectedUser(user);
      setIsPopupOpen(true);
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedUser(null);
  };

  const formatTimestamp = (timestamp) => {
    return format(new Date(timestamp), 'MMMM dd, yyyy');
  };

  return (
    <div className="comment-container">
      <div className="comment-card-forum-form">
        {reply.length > 0 ? (
          <ul>
            {reply.map((c, i) => (
              <li key={i}>
                <div className="user-info-form-forum-detail">
                  <span
                    className="author-info-detail-page-form"
                    onClick={() => openPopup(c.owner)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={
                        c.owner?.profileImage ||
                        "https://tse1.mm.bing.net/th?id=OIP.l5aKraulmzVxV1y2yjnNagHaFj&pid=Api"
                      }
                      alt="User"
                      className="author-image-comment"
                    /> 
                  </span>
                  <span className="author-name">{c.owner?.username || "Anonymous"} <img src={mail}  style={{width: "17px", height:"17px"}} className="mail-to-img"/></span>
                </div>
                <p className="comment-text">{c.text}</p>
                <p id="forum-timestamp-container">{formatTimestamp(c.createdAt)}</p>
              {isLoggedIn && currentUser?._id === topic.author?._id && (
                <button onClick={() => handleDeleteComment(c._id)} className="delete-comment-btn">
                  <img src={bin} alt="Delete" />
                </button>
              )}         

              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>

      <form onSubmit={handleAddComment}>
        <div className="add-comment-container">
          <label className="label-add-comment">
            <textarea
              rows="4"
              className="text-area-comment"
              placeholder="Add your comment here"
              value={replyTopic}
              onChange={(e) => setReplyTopic(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="post-btn">
            <img src={post} alt="Post" />
          </button>
        </div>
      </form>

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

export default UpdateForumForm;
