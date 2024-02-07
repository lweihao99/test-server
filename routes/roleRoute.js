const express = require("express");
const Role = require("../models/roleModel");

const router = express.Router();

// get All account data
router.get("/", async (req, res) => {
  try {
    const roles = await Role.find();

    if (!roles) throw Error("No role found.");

    res.status(200).json({
      status: "Success",
      data: roles,
    });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

// add new account with random roleId
router.post("/", async (req, res) => {
  try {
    const randomId = Math.floor(Math.random() * 10000).toString();

    const newRole = await Role.create({ ...req.body, roleId: randomId });

    if (!newRole) throw Error("Something went wrong while creating the role.");

    res.status(200).json({
      status: true,
      data: newRole,
      message: "New role has been created.",
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// delete account by id
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const del = await Role.findByIdAndDelete(id);
    res.status(204).json({
      status: true,
      message: "Data deleted.",
      data: null,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// update new account role data
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const newData = await Role.findByIdAndUpdate(id, data, {
      new: true, // 确认新的数据返回
      runValidators: true,
    });

    if (!newData) throw Error("No data found with id.");

    res.status(200).json({
      status: true,
      data: newData,
    });
  } catch (error) {
    req.status(404).json({
      status: false,
      message: error.message,
    });
  }
});

module.exports = router;
