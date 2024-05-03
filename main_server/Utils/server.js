const { Server: SocketIOServer } = require("socket.io");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { InitializeDB } = require("./database");

InitializeDB();

// Create an Express app
const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: [
      "*",
      "http://localhost:5173",
      "http://localhost:5173/",
      "https://web3-app-green.vercel.app/",
      "https://web3-app-green.vercel.app",
    ],
    credentials: true,
  })
);

app.use(bodyParser.json());
// Create the server instance
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: [
      "*",
      "http://localhost:5173",
      "http://localhost:5173/",
      "https://porchemaintenance.netlify.app/",
      "https://porchemaintenance.netlify.app",
    ],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  },
});

// Setting up the socket server
io.on("connection", (socket) => {
  // console.log("hello world");
});

const sendData = (data) => {
  io.emit("getData", data);
};

module.exports = { server, sendData, app };
