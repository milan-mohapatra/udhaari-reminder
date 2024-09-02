const mongoose = require("mongoose");
const { USER } = require("../utils/constant.utils.js");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: String,
      default: USER
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = {User}