const express = require("express");

const {
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
  fetchSingleChat,
} = require("../controllers/chats");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(protect, fetchChats);
router.route("/:userId").get(protect, fetchSingleChat);
router.route("/group").post(protect, createGroupChat);
router.route("/group/:id").put(protect, renameGroup);
router.route("/group/:id/groupadd").put(protect, addToGroup);
router.route("/group/:id/groupremove").put(protect, removeFromGroup);

module.exports = router;
