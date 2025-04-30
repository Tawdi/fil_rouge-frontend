require('dotenv').config();
const { createServer } = require("http");
const { Server } = require("socket.io");
const redis = require("redis");

const seatHandler = require('./handlers/seatHandler');

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL, 
    methods: ["GET", "POST"],
    credentials: true,
  }
});

// Redis 
const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
});

redisClient.connect().catch(console.error);

// socket connection
io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);
  seatHandler(io, socket, redisClient);
});


const PORT = process.env.PORT || 9999;
httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
