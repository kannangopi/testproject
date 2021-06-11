const mongoose = require("mongoose");
const chatroom = mongoose.Schema({
  partner: {
    type: String,
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
module.exports = chatroom;
