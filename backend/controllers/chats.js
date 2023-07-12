const User = require("../models/User");
const Chat = require("../models/Chat");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

exports.fetchChats = asyncHandler(async (req, res, next) => {
  let chats = await Chat.find({
    users: { $elemMatch: { $eq: req.user._id } },
  })
    .populate("users")
    .populate("groupAdmin")
    .populate("latestMessage")
    .sort({ updatedAt: -1 });

  chats = await Chat.populate(chats, {
    path: "latestMessage.sender",
    select: "name email",
  });

  res.status(200).json({ success: true, data: chats });
});

exports.fetchSingleChat = asyncHandler(async (req, res, next) => {
  const chat = await Chat.findOne({
    users: { $elemMatch: { $eq: req.user._id } },
    users: { $elemMatch: { $eq: req.params.userId } },
  });

  console.log(chat);
});

exports.createGroupChat = asyncHandler(async (req, res, next) => {
  let { users, name } = req.body;
  if (!users || !name) {
    return next(new ErrorResponse("Users and Group name are required", 400));
  }

  users = JSON.parse(users);
  if (users.length < 2) {
    return next(
      new ErrorResponse(
        "Atleast two users are required to create a group chat",
        400
      )
    );
  }

  const chatData = {
    users: [...users, req.user._id],
    isGroupChat: true,
    groupAdmin: req.user._id,
    name,
  };

  let groupChat = await Chat.create(chatData);

  groupChat = await Chat.findById(groupChat._id)
    .populate("users")
    .populate("groupAdmin")
    .populate("latestMessage.sender");
  res.status(200).json({ success: true, data: groupChat });
});

exports.renameGroup = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return next(
      new ErrorResponse(
        "Please provide a name, you want your group to rename to.",
        400
      )
    );
  }

  let chatGroup = await Chat.findOne({
    isGroupChat: true,
    _id: req.params.id,
    users: { $elemMatch: { $eq: req.user._id } },
  })
    .populate("users")
    .populate("groupAdmin")
    .populate("latestMessage.sender");

  if (!chatGroup) {
    return next(
      new ErrorResponse(
        "Group doesnot exists or you are not a member of that group",
        400
      )
    );
  }

  chatGroup.name = name;
  await chatGroup.save();

  res.status(200).json({ success: true, data: chatGroup });
});

exports.addToGroup = asyncHandler(async (req, res, next) => {
  let { users } = req.body;
  if (!users) {
    return next(new ErrorResponse("Users are required", 400));
  }

  users = JSON.parse(users);
  if (users.length < 1) {
    return next(new ErrorResponse("Add atleast one user to the group", 400));
  }

  let groupChat = await Chat.findOne({
    _id: req.params.id,
    isGroupChat: true,
    groupAdmin: req.user._id,
  });
  if (!groupChat) {
    return next(
      new ErrorResponse(
        "Group doesnot exists or you are not a admin of the group",
        400
      )
    );
  }

  const isNotValid = await User.checkValidUsers(users);
  if (isNotValid) {
    return next(new ErrorResponse(`One or more user does not exists`, 404));
  }

  const uniqueUsers = User.getUniqueUsers(groupChat.users, users);

  groupChat = await Chat.findByIdAndUpdate(
    req.params.id,
    { users: uniqueUsers },
    {
      new: true,
    }
  )
    .populate("users")
    .populate("groupAdmin")
    .populate("latestMessage.sender");
  res.status(200).json({ success: true, data: groupChat });
});

exports.removeFromGroup = asyncHandler(async (req, res, next) => {
  const { user } = req.body;
  if (!user) {
    return next(new ErrorResponse("Users are required", 400));
  }

  const isUser = await User.findById(user);
  if (!isUser) {
    return next(
      new ErrorResponse(`User with ID: ${user} does not exists`, 400)
    );
  }

  let groupChat = await Chat.findOne({
    _id: req.params.id,
    isGroupChat: true,
    groupAdmin: req.user._id,
  });

  if (!groupChat) {
    return next(
      new ErrorResponse(
        "Group doesnot exists or you are not a admin of the group",
        400
      )
    );
  }

  groupChat = await Chat.findByIdAndUpdate(
    groupChat._id,
    {
      users: groupChat.users.filter((usr) => usr.toString() !== user),
    },
    { new: true }
  )
    .populate("users")
    .populate("groupAdmin")
    .populate("latestMessage.sender");
  res.status(200).json({ success: true, data: groupChat });
});
