const express = require("express");

const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateDetails,
  sendOtp,
  verifyOtp,
  searchUser,
  getUsers,
} = require("../controllers/auth");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/users").get(protect, getUsers);

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/me").get(protect, getMe);

router.route("/forgotpassword").post(forgotPassword);

router.route("/sendotp").post(sendOtp);

router.route("/verifyotp").post(verifyOtp);

router.route("/resetpassword/:resettoken").put(resetPassword);

router.route("/updatedetails").post(protect, updateDetails);

router.route("/updatepassword").post(protect, updatePassword);

router.route("/").get(protect, searchUser);

module.exports = router;
