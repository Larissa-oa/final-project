import React, { useState } from 'react';
import './Chatbot.css'; 
import plantbot from "../assets/images/plantbot.png"
import textbox from "../assets/images/chatbot-intro.png"
import post from "../assets/images/post.png"

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    const trimmedMessage = userMessage.trim();
    if (!trimmedMessage) return;

  
    setMessages((prev) => [...prev, { sender: 'user', text: trimmedMessage }]);
    setUserMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/chat/plantbot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmedMessage }),
      });

      const data = await response.json();
      const botReply = data.reply || "Sorry, I didn't understand that.";

      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Oops! Something went wrong. Please try again later.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="chatbot-box">
      <div className="chatbot-header">
        <img src={plantbot} alt="PlantBot" />
        <span className="chatbot-intro">
        <h2>Hello, I'm Compost Malone</h2>
        <p> your plant assistant</p>
        </span>
      </div>

      <div className="chatbot-messages">
        {messages.length === 0 && <p className="placeholder">Got a plant questions?🌿</p>}
        {messages.map((msg, idx) => (
          <div key={idx} className={`bubble ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && <div className="bubble bot">Typing...</div>}
      </div>

      <div className="chatbot-input">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask PlantBot..."
        />
        <button onClick={sendMessage} disabled={isLoading || !userMessage.trim()}>
          <img src={post} alt="Send" />
        </button>
      </div>
    </div>
  );
};

export { Chatbot };
