const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db')
require("dotenv").config();


const app = express();
const server = http.createServer(app);
const io = new Server(server, {cors: {origin: "*"}});

// middleware
app.use(cors());
app.use(express.json());

// database connection
// mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true})
// .then(() => console.log("MongoDB connected successfully"))
// .catch((err) => console.error("MongoDB connection failed:", err));
connectDB();

//socket io setup
io.on("connection", (socket) => {
    console.log("New WebSocket Connection",socket.id);

    socket.on("message",  (data) => {
        io.emit("message", data);
    });
    
    socket.on("disconnect", () => {
        console.log("WebSocket disconnected", socket.id);
    });
});

// routes placeholder
app.get("/", (req,res) => res.send("Emergency communication platform API"));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
