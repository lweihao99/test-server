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
    res.status(200).json({
      status: true,
      message: "Data deleted.",
      data: del,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
