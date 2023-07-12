const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add your name."],
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
      required: [true, "Please add an email"],
      unique: [true, "User with email already exists"],
    },
    role: {
      type: String,
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: [6, "Password must be atleast 6 characters"],
      select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    otp: String,
    otpExpire: Date,
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.statics.checkValidUsers = async function (ids) {
  const promises = ids.map(async (id) => {
    console.log(id);
    const user = await this.findById(id);
    if (!user) return false;
    else return true;
  });

  let resultsArray = await Promise.all(promises);
  return resultsArray.some((i) => i == false);
};

UserSchema.statics.getUniqueUsers = function (existingUsers, newUsers) {
  const allUsers = [...existingUsers.map((usr) => usr.toString()), ...newUsers];
  return allUsers.filter((item, pos) => {
    if (allUsers.indexOf(item) === pos) {
      return item;
    }
  });
};

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
  return resetToken;
};

UserSchema.methods.getOtp = function () {
  const otp = crypto.randomInt(1000, 9999);
  this.otp = crypto.createHash("sha256").update(otp.toString()).digest("hex");

  this.otpExpire = Date.now() + 10 * 60 * 1000;
  return otp;
};

module.exports = mongoose.model("User", UserSchema);
