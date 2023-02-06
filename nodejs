// Import required modules
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

// Set up Express app
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Listen for socket connection
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Listen for chat messages
  socket.on('chat message', (msg) => {
    console.log(`Message: ${msg}`);

    // Broadcast message to all connected clients
    io.emit('chat message', msg);
  });
});

// Start server on specified port
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
