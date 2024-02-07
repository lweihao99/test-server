const express = require("express");
const User = require("../models/userModel");

const router = express.Router();

// create user
const createUser = async (req, res) => {
  try {
    const newUser = await User.create(...req.body);

    if (!newUser) throw Error("No user found.");

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

// get user by query
const getUser = async (req, res) => {
  try {
    const { username, password } = req.query; // 获取查询数据
    const user = await User.findOne({ username, password }); // 根据查询字符串进行数据库查询
    // console.log(user);

    if (!user) throw new Error("用户不存在");

    res.status(200).json({
      status: "success",
      requestAt: req.requestTime,
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: error.message,
    });
  }
};

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      requestAt: req.requestTime,
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Data not found",
    });
  }
};

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser);

module.exports = router;
