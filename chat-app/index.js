const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const PORT = 8000;

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  res.sendFile("./public/index.html");
});

//Socket connection
//create the socket connection
io.on("connection", (socket) => {
  //console.log("One user is connected!", socket.id);
  //get the client message
  socket.on("user-message", (message) => {
    //console.log("A new user message: ", message);
    io.emit("message", message); //fire message to client
  });
});

server.listen(PORT, () => console.log(`Server is running at ${PORT}`));
