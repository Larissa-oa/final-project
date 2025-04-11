import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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

  return (
    <div>
      <h3>Comments</h3>
      {reply.length > 0 ? (
        <ul>
          {reply.map((c, i) => (
            <li key={i}>
              <strong>{c.owner?.username || "Anonymous"}</strong>: {c.text}
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}

      <form onSubmit={handleAddComment}>
        <label>
          Your name:
          <input
            type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            placeholder="Enter your name"
          />
        </label>
        <label>
          Add your comment here:
          <textarea
            rows="4"
            value={replyTopic}
            onChange={(e) => setReplyTopic(e.target.value)}
            required
          />
        </label>
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default UpdateForumForm;
