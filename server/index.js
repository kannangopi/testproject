const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/sample";
const router = require("./route/route");
const { urlencoded } = require("express");
const socket = require("socket.io");
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());
//                                                    //connection to mongodb
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
connection = mongoose.connection;
connection.on("open", () => {
  console.log("db connected.....");
});

//                                                      //server listening on 3020
const server = app.listen(3020, () => {
  console.log("server is runing on 3020");
});
io = socket(server);

app.use(router);

//                                                    //chat

io.on("connection", (socket) => {
  console.log("user connected to the socket");
  socket.on("joinroom", (room) => {
    console.log(room);
  });
  socket.on("sendchat", (msg) => {
    socket.emit("disp", msg.message);
    io.to(msg.room);
    console.log(msg.message);
  });
});
