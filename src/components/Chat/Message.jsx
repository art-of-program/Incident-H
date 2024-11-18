import React from 'react';

function Message({ message, isUser }) {
  return (
    <div className={`message ${isUser ? 'user-message' : 'bot-message'}`}>
      <div className="message-content">
        <p>{message.text}</p>
        <span className="timestamp">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}

export default Message;