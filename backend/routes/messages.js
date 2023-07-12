const express = require("express");
const { createMessage, getAllMessages } = require("../controllers/messages");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/:id").post(protect, createMessage).get(protect, getAllMessages);

module.exports = router;
