const mongoose = require("mongoose");
const chatroom = mongoose.Schema({
  partner: {
    type: [String, String],
    required: true,
  },
  chat: {
    date: {
      type: Date,
    },

    message: {
      type: String,
    },
  },
});
module.exports = mongoose.model("chats", chatroom);
