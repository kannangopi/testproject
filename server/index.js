const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/sample";
const router = require("./route/route");
const { urlencoded } = require("express");
const socket = require("socket.io");
const app = express();
const roomCheck = require("./middleware/mid");
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());
let partnerRoom;
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

io.on("connection", async (socket) => {
  console.log("user connected to the socket");
  socket.on("joinroom", async (room) => {
    partnerRoom = await roomCheck(room);
    console.log(partnerRoom);
    console.log("checking room name on join");
    // socket.join(partnerRoom);
  });
  socket.on("sendchat", (msg) => {
    console.log(partnerRoom + "test room name");
    // socket.emit("disp", msg.message);
    io.to(partnerRoom).emit("disp", msg.message);
    console.log(msg.message);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
