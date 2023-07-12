const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

ChatSchema.statics.getChat = async function (id1, id2) {
  let chat = await this.findOne({
    isGroupChat: false,
    $and: [
      {
        users: {
          $elemMatch: { $eq: id1 },
        },
      },
      {
        users: {
          $elemMatch: { $eq: id2 },
        },
      },
    ],
  });

  if (!chat) {
    chat = await this.create({
      name: id1,
      users: [id1, id2],
    });
  }

  return chat;
};

module.exports = mongoose.model("Chat", ChatSchema);
