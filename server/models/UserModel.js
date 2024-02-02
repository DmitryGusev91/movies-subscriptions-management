const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    password: String,
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("user", userSchema, "users");

module.exports = User;
