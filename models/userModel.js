const mongoose = require("mongoose");

// 定义数据模型
const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: [true, "Please enter your username"],
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
  },
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  if (this.password === enteredPassword) {
    return true;
  }
  return false;
};

userSchema.methods.matchPassword = async function (enteredPassword) {
  if (this.password === enteredPassword) {
    return true;
  } else {
    return false;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
