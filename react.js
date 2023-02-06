import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';

const Chat = () => {
  // Set up state for messages and input value
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Connect to socket.io server
  useEffect(() => {
    const socket = socketio('http://localhost:3000');

    // Listen for chat messages and update messages state
    socket.on('chat message', (msg) => {
      setMessages([...messages, msg]);
    });

    // Clean up effect
    return () => {
      socket.disconnect();
    };
  }, [messages]);

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Emit chat message through socket
    socket.emit('chat message', inputValue);

    // Reset input value
    setInputValue('');
  };

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
