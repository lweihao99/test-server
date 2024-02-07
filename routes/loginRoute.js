const express = require("express");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const router = express.Router();

const JWT_SECRET = "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0";
const JWT_EXPIRES_IN = "90d";

const signToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

const comparePassoword = async (userPassword, enteredPassword) => {
  // 对比密码
  if (userPassword === enteredPassword) return true;
  else return false;
};

const login = async (req, res) => {
  try {
    // 登录逻辑
    const { username, password } = req.body;

    if (!username || !password) throw new Error("用户名或密码不能为空");

    const user = await User.findOne({ username });
    console.log(user);

    const correct = await comparePassoword(user.password, password);

    if (!correct && !user) throw Error("username or password incorrect");

    const token = signToken(user._id);

    res.status(200).json({
      status: true,
      token,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

router.route("/").post(login);

module.exports = router;
