import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./UpdateForumForm.css" 
import bin from "../assets/images/delete.png"
import post from "../assets/images/post.png"
import { format } from 'date-fns'

const UpdateForumForm = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [replyTopic, setReplyTopic] = useState('');
  const [ownerName, setOwnerName] = useState(''); 
  const [reply, setReply] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/forum/the-topic/${id}`)
      .then((res) => {
        console.log(res.data)
        setTopic(res.data);
        setReply(res.data.reply || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleAddComment = (e) => {
    e.preventDefault();

    const newReply = {
      text: replyTopic,
      owner: ownerName || "Anonymous",  
    };

    const token = localStorage.getItem("authToken")


    axios
      .post(`${import.meta.env.VITE_API_URL}/forum/${id}/reply`, newReply, {headers: {Authorization: `Bearer ${token}`}})
      .then((res) => {
        console.log(res.data.updatedForum.reply)
        setReply(res.data.updatedForum.reply);
        setReplyTopic('');
        setOwnerName('');  
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formatTimestamp = (timestamp) => {
    return format(new Date(timestamp), 'MMMM dd, yyyy');
  };


  // does it have to be on the ForumContext? 
  const handleDeleteComment = (replyId) => {
    const token = localStorage.getItem("authToken");
    axios
      .delete(`${import.meta.env.VITE_API_URL}/forum/${id}/delete-reply/${replyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("Reply deleted:", res);
        setReply((prevReplies) => prevReplies.filter((comment) => comment._id !== replyId));
      })
      .catch((err) => {
        console.log("Error deleting reply:", err);
      });
  };

  return (
    <div className="comment-container">
      <div className="comment-card-forum-form">
      {reply.length > 0 ? (
        <ul>
          {reply.map((c, i) => (
            <li key={i}>
              <div className="user-info">
             <img
                  src={c.owner?.profileImage || "/default-image.jpg"}
                  alt={c.owner?.username || "Anonymous"}
                  style={{
                    width: "65px",
                    height: "60px",
                    borderRadius: "50%",
                  }}
                  className="author-image-comment"
                />
                
              <span className="author-name">{c.owner?.username || "Anonymous"}</span> 
              </div>
              <p className="comment-text">{c.text}</p>
              <p className="forum-timestamp">{formatTimestamp(c.createdAt)}</p>
              <button onClick={() => handleDeleteComment(c._id)} className="delete-comment-btn"><img src={bin} /></button>
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
          <input
            rows="4"
            className="text-area-comment"
            placeholder='Add your comment here'
            value={replyTopic}
            onChange={(e) => setReplyTopic(e.target.value)}
            required

          />
        </label>
        <button type="submit" className="post-btn"><img src={post} /></button>
        </div>
        
      </form>
    </div>
  );
};

export default UpdateForumForm;