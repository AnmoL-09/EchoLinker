const Message = require('../models/Message');
const User = require('../models/User');

//send a new message 
exports.sendMessage = async (req,res) => {
    const {content, messageType} = req.body;

    try {
        const message = new Message({
            sender: req.user._id,
            content,
            messageType,
        });

        await message.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(500).send("Server Error:" + error.message);     
    }
};

// get all messages
exports.getMessages = async (req,res) => {
    try {
        const messages = await Message.find().populate("sender","name email")
    } catch (error) {
        res.status(500).send("Server Error: "+ error.message);
    }
};

// sync offline messages
exports.syncMessages = async (req,res) => {
    const {messages} = req.body;

    try {
        const savedMessages = await Message.insertMany(messages);
        res.status(201).json(savedMessages);
    } catch (error) {
        res.status(500).send("Server Error: "+ error.message);
    }
};