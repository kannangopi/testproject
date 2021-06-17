const express = require("express");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/sample";
const router = require("./route/route");
const socketio = require("socket.io");
const app = express();
const chatdb = require("./db/userschema");
const roomCheck = require("./middleware/mid");
const roomcheck = require("./middleware/mid2");
// const saveMsg = require("./middleware/Savemsg");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const server = http.createServer(app);
const io = socketio(server);
let partnerRoom;
//                                                    //connection to mongodb
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
connection = mongoose.connection;
connection.on("open", () => {
  console.log("db connected.....");
});
app.use(router);
//                                                      //server listening on 3020
server.listen(3021, () => {
  console.log("server is runing on 3021");
});

//                                                    //connecting to socket
io.on("connection", async (socket) => {
  console.log("user connected to the socket", socket.id);

  //                                                  //chat joining room

  socket.on("joinroom", async (room) => {
    //                                              //CALLING function checking for roomname
    partnerRoom = await roomCheck(room);
    // partnerRoom = await roomcheck(room);
    console.log("checking room name on join");
    socket.join(partnerRoom.room);
    console.log(partnerRoom.room, "11111111111");
    chatdb.find({ room: partnerRoom.room }, { chat: 1, _id: 0 }, (err, res) => {
      if (err) console.log(err);
      else {
        console.log(res);
        let chathistory = res[0].chat;

        io.emit("room", { room: partnerRoom, chathistory });
      }
    });
  });
  //                                                 //leaveing room
  socket.on("leaveroom", (room) => {
    console.log(room.room);
    socket.leave(room.room);
  });

  //                                                //sending message to room

  socket.on("sendchat", (msg) => {
    io.to(msg.chatroom).emit("disp", msg.message);
    chatdb
      .updateOne(
        { room: msg.chatroom },
        { $push: { chat: { message: msg.message, date: msg.date } } }
      )
      .then((result) => {
        console.log(msg.chatroom);
        console.log(msg.message);
        console.log(result);
      });
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
