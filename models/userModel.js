const mongoose = require("mongoose");
const { type } = require("os");

// 定义数据模型,酒店客户数据模型
const userSchema = new mongoose.Schema({
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
  username: {
    type: String,
    required: [true, "Please enter your username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    select: false,
  },
  // note: pass confirm 感觉可以不用存储到数据库里，直接在前端进行比对
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // 进行密码确认, 只在save 和 create 执行
      validator: function (value) {
        return value === this.password;
      },
      message: "Password are not the same.",
    },
    select: false,
  },
  phoneNumber: {
    type: Number,
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: {
      values: ["vip", "vvip", "normal"],
      message: "Account role must be vip,admin or normal.",
    },
  },
  admin: {
    type: Boolean,
  },
  birthDate: {
    type: Date,
    required: [true, "Please enter your birth date"],
  },
});

// 不要把confirm password 返回给数据库
userSchema.pre("save", async function (next) {
  this.confirmPassword = undefined;
  next();
});

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   if (this.password === enteredPassword) {
//     return true;
//   }
//   return false;
// };

const User = mongoose.model("User", userSchema);

module.exports = User;
