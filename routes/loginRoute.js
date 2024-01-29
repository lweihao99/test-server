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

const login = async (req, res) => {
  try {
    // 登录逻辑
    const { username, password } = req.body;

    if (!username || !password) throw new Error("用户名或密码不能为空");

    const user = await User.findOne({ username });

    if (!user) throw new Error("用户不存在");

    const token = signToken(user._id);

    const correct = await user.matchPassword(password);

    if (!correct) throw Error("密码错误");

    res.status(200).json({
      status: "success",
      token,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

router.route("/").post(login);

module.exports = router;
