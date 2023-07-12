const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorResponse(`User not found with ID: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: user });
});

exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(200).json({ success: true, data: user });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const { name, email, role, password } = req.body;
  let user = await User.findById(req.params.id).select("+password");
  if (!user) {
    return next(
      new ErrorResponse(`User not found with ID: ${req.params.id}`, 404)
    );
  }

  user.name = name || user.name;
  user.email = email || user.email;
  user.role = role || user.role;
  user.password = password || user.password;

  user = await user.save();

  res.status(200).json({ success: true, data: user });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorResponse(`User not found with ID: ${req.params.id}`, 404)
    );
  }

  await user.remove();
  res.status(200).json({ success: true, data: {} });
});
