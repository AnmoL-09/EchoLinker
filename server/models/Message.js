const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    messageType: { type: String, enum: ["Alert", "Help Request", "General"], default: "General" },
    isSynced: { type: Boolean, default: false }, // For offline messaging
  }, { timestamps: true });
  
  module.exports = mongoose.model("Message", MessageSchema);