const mongoose = require("mongoose");
const chatroom = mongoose.Schema({
  user1: {
    type: String,
    required: true,
  },
  user2: {
    type: String,
    require: true,
  },
  room: {
    type: String,
    required: true,
  },
  chat: {
    type: Array,
    required: true,
  },
});
module.exports = mongoose.model("chat", chatroom);
