const asyncHandler = require("../middleware/async");
const Chat = require("../models/Chat");
const Message = require("../models/Message");
const ErrorResponse = require("../utils/errorResponse");

exports.createMessage = asyncHandler(async (req, res, next) => {
  const { content } = req.body;
  const { id } = req.params;

  const chat = await Chat.getChat(id, req.user._id);
  let message = await Message.create({
    content,
    sender: req.user._id,
    chat: chat._id,
  });

  message = await Message.findById(message._id)
    .populate("sender")
    .populate("chat");
  message = await Message.populate(message, {
    path: "chat.users",
    select: "name email _id",
  });

  chat.latestMessage = message;
  await chat.save();

  res.status(200).json({ success: true, data: message });
});

exports.getAllMessages = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const chat = await Chat.findById(id);
  if (!chat) {
    return next(new ErrorResponse("No messages in this chat", 404));
  }

  const messages = await Message.find({ chat: chat._id }).populate("sender");
  res.status(200).json({ success: true, data: messages });
});
