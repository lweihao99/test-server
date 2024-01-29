const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    roleId: {
      type: Number,
      required: [true, "Need set role id."],
      unique: true,
    },
    role: {
      type: String,
      required: [true, "Need set account role."],
    },
    accountName: {
      type: String,
      required: [true, "Need set account name."],
    },
  },
  {
    // toJSON: {
    //   transform: function (doc, ret) {
    //     delete ret._id;
    //   },
    // },
    versionKey: false, // 不包含版本键 __v
  }
);

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
