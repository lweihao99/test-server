const mongoose = require("mongoose");

// 员工数据模型
const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name"],
      trim: true, // 取消空格
    },
    email: {
      type: String,
      required: [true, "Please enter the email"],
      trim: true,
      lowercase: true,
      validate: {
        // 对邮箱格式验证
        validator: function (value) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value); // 使用test方法来测试字符串是否匹配regular expression.
        },
        message: "Please enter a valid email address",
      },
    },
    age: {
      type: Number,
    },
    birthDate: {
      type: Date,
    },
    username: {
      type: String,
      required: [true, "Please enter your username"],
      select: false,
    },
    phoneNumber: {
      type: Number,
      required: [true, "Please enter phone number"],
    },
    photo: {
      type: String,
    },
    roleId: {
      type: Number,
      required: [true, "Need set role id."],
      unique: true,
    },
    role: {
      type: String,
      required: [true, "Need set staff role."],
      enum: {
        values: [
          "manager",
          "reception",
          "chef",
          "reservation",
          "front office",
          "staff",
        ],
        message: function (val) {
          return `role should choose between ${this.values.join(", ")}`;
        },
      },
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    hireDate: {
      type: Date,
    },
    status: {
      type: String,
      required: [true, "Need set staff status."], // 确认员工是离职还是在职
      enum: ["active", "inactive"],
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
