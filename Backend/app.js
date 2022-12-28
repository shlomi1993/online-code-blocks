// Written by Shlomi Ben-Shushan.

// This file contains the implementation of the server-side application API.

// Reference to DynamoDB API file.
const dynamodb = require('./dynamodb');

// References to Express server and CORS settings.
const cors = require('cors');
const express = require('express');
const app = express();

// CORS settings object.
const corsHeader = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

// Create Socket.IO server combined with Express.
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: corsHeader });

// Load port from configuration file.
const PORT = require('./config.json').port;

// For encoding CRUD requests.
app.use(
    express.urlencoded({
        extended: false,
    })
);

// Set CORS.
app.use(cors())

// Make express parse HTTP request's body as JSON.
app.use(express.json()) 

// Sanity check (ping --> pong).
app.get('/ping', (req, res) => {
    res.send('PONG')
});

// Handle GET requests -- retrieve a specific code-block from the DynamoDB.
app.get('/getblock', (req, res) => {
    let id = req.query.id;
    dynamodb.getBlock(res, id);
});

// Handle GET requests -- retrieve all code-blocks from the DynamoDB.
app.get('/getAllCodeBlocks', (req, res) => {
    dynamodb.getAllBlocks(res);
});

// Handle GET requests -- return the ID of the mentor of a given room (by room-ID).
app.get('/getMentor', (req, res) => {
  const roomId = req.query.blockId;
  const mentor = (roomId in rooms) ? rooms[roomId][0] : null;
  res.json({ mentorId: mentor });
});

// Handle POST requests -- requests the table in the DynamoDB to create a new code-block.
app.post('/createblock', (req, res) => {
  const title = req.body.title;
  dynamodb.putBlock(res, title);
});

// Handle PUT requests -- requests to modify a code-block already stored in DynamoDB.
app.put('/updateblock', (req, res) => {
  const id = req.query.id;
  const name = req.query.name;
  const code = req.body.code;
  console.log(id);
  console.log(code);
  dynamodb.updateBlock(res, id, name, code);
});

// Handle DELETE requests -- requests to delete a specific code-block in the DynamoDB.
app.delete('/deleteblock', (req, res) => {
  const id = req.query.id;
  dynamodb.deleteBlock(res, id);
});

// This object helps to manage the different sockets and rooms.
const rooms = {};

// Using Socket.IO to share text-fields between multiple sockets.
io.on('connection', (socket) => { 
  
  // Listen and handle an event where a user entered a code-block (a socket joined a room).
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    if (roomId in rooms) {
      rooms[roomId].push(socket.id);
    } else {
      rooms[roomId] = [socket.id];
    }
  });

  // Listen and handle an event where a user edited code-block.
  socket.on('send_message', (data) => {
    socket.to(data.roomId).emit('recieve_message', data.message)
  });
  
  // Listen and handle an event where a user returned from a code-block (a socket left a room).
  socket.on('bye', (data) => {
    try {
      const i = rooms[data.roomId].indexOf(data.socketId);
      rooms[data.roomId].splice(i, 1);
      socket.to(data.roomId).emit('recieve_message', rooms[roomId][0]);
    } catch (e) {}
  });
});

// Listen to new clients.
server.listen(PORT, () => console.log(`Online-Code-Blocks backend server is available on port ${PORT}.`));
