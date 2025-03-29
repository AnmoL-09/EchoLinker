const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, syncMessages } = require("../controllers/messageController");
const auth = require("../middleware/auth");

// routes 
router.post("/send", auth, sendMessage);
router.get("/all", auth, getMessages);
router.post("/sync", auth, syncMessages);

module.exports = router;