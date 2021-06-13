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
    require: true,
  },
  chat: {
    msg: {
      date: {
        type: String,
        required: false,
      },

      message: {
        type: String,
        required: false,
      },
    },
  },
});
module.exports = mongoose.model("chat", chatroom);
