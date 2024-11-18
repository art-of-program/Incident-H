import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, LogOut } from 'lucide-react';
import Message from './Message';
import PremiumModal from '../Payment/PremiumModal';
import '../../styles/ChatStyles.css';

function ChatRoom({ user, setUser }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showPremium, setShowPremium] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const navigate = useNavigate();

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    if (messages.length >= 5 && !isPremium) {
      setShowPremium(true);
      return;
    }

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: user.username,
      timestamp: new Date()
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: `Hey ${user.username}! This is a demo response.`,
        sender: 'Bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Incident Helper</h2>
        <div className="header-right">
          {isPremium && <span className="premium-badge">Premium</span>}
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
          </button>
        </div>
      </div>

      <div className="messages-container">
        {messages.map(message => (
          <Message 
            key={message.id} 
            message={message} 
            isUser={message.sender === user.username}
          />
        ))}
      </div>

      <form className="message-form" onSubmit={handleSend}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">
          <Send size={20} />
        </button>
      </form>

      {showPremium && (
        <PremiumModal
          onClose={() => setShowPremium(false)}
          onSuccess={() => {
            setIsPremium(true);
            setShowPremium(false);
          }}
        />
      )}
    </div>
  );
}

export default ChatRoom;