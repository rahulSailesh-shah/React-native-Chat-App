const express = require("express");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

const errorHandler = require("./middleware/error");

//Load env vars
dotenv.config({ path: "./config/config.env" });

//DB connect file
const connectDB = require("./config/db");
connectDB();

//Routes files
const auth = require("./routes/auth");
const users = require("./routes/users");
const chats = require("./routes/chats");
const messages = require("./routes/messages");

const app = express();

//Read Json data from req body
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static("./public"));

const PORT = process.env.PORT || 8000;

//Mount Routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/chats", chats);
app.use("/api/v1/message", messages);

//Error Handler
app.use(errorHandler);

const server = app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on port: ${process.env.PORT}`
  )
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
});

io.on("connection", (socket) => {
  console.log("connected to Socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("CONNECTED!!!!");
  });

  socket.on("joinChat", (room) => {
    socket.join(room);
    console.log(`User joined romm: ${room}`);
  });

  socket.on("newMessage", (newMessage) => {
    const chat = newMessage.chat;
    chat.users.forEach((user) => {
      if (user._id.toString() !== newMessage.sender._id.toString()) {
        socket.in(user._id).emit("messageReceived", newMessage);
        console.log(`Message sent to: ${user.name}`);
      }
    });
  });
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
