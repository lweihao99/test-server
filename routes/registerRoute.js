const express = require("express");
const User = require("../models/userModel");

const router = express.Router();

// create user
const createUser = async (req, res) => {
  try {
    console.log(req.body);
    // 将日期改为年月日

    const newUser = await User.create(req.body);
    // console.log(newUser);

    if (!newUser) throw Error("User create failed.");

    res.status(201).json({
      status: true,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};

router.post("/", createUser);

module.exports = router;
