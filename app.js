// backend
const express = require("express");
const cors = require("cors");

const userRoute = require("./routes/userRoute");
const loginRoute = require("./routes/loginRoute");
const roleRoute = require("./routes/roleRoute");
const registerRoute = require("./routes/registerRoute");

const app = express();

app.use(express.json());
app.use(cors());

// 获取时间
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// router
app.use("/api/user", userRoute);
app.use("/api/login", loginRoute);
app.use("/api/role", roleRoute);
app.use("/api/register", registerRoute);

app.use("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "somethings wrong",
  });
});

module.exports = app;
