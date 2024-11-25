import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, LogOut, Trash2 } from 'lucide-react';
import axios from 'axios';
import Message from './Message';
import PremiumModal from '../Payment/PremiumModal';
import '../../styles/ChatStyles.css';

function ChatRoom({ user, setUser }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showPremium, setShowPremium] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const navigate = useNavigate();

  console.log({user})


  // Load chat history from localStorage
  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('chatHistory')) || [];
    setMessages(storedMessages);
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    if (messages.length >= 5 && !isPremium) {
      setShowPremium(true);
      return;
    }

    // Add user message to the chat
    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: "dude",
      timestamp: new Date(),
    };


    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');

    try {
      // Send user message to the server and await response
      const response = await axios.post(
        'http://89.116.48.145:8080/chat',
        { message: newMessage },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response)

      // Add server response to the chat
      const serverMessage = {
        id: Date.now() + 1,
        text: response.data.reply || 'No response from server.',
        sender: 'Server',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, serverMessage]);
    } catch (error) {
      console.error('Error sending message to the server:', error);

      // Add error message to the chat
      const errorMessage = {
        id: Date.now() + 2,
        text: 'Error: Unable to fetch server response.',
        sender: 'System',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  const handleDeleteMessage = (id) => {
    setMessages(messages.filter((message) => message.id !== id));
  };

  const handleClearChat = () => {
    setMessages([]);
  };


  return (
    <div className="chat-wrapper">
      {/* Sidebar */}
      <div className="chat-sidebar">
        <h2>Incident Helper</h2>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
        </button>
        <button className="clear-chat-btn" onClick={handleClearChat}>
          Clear Chat <Trash2 size={16} />
        </button>
      </div>

      {/* Main Chat Area */}
      <div className="chat-container">
        <div className="messages-container">
          {messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              isUser={message.sender === "dude"}
              onDelete={() => handleDeleteMessage(message.id)}
            />
          ))}
        </div>

        {/* Input Form */}
        <form className="message-form" onSubmit={handleSend}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            name="message"
          />
          <button type="submit">
            <Send size={20} />
          </button>
        </form>

        {/* Premium Modal */}
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
    </div>
  );
}

export default ChatRoom;
