const mongoose = require("mongoose");
const os = require("os");

// const networkInterfaces = os.networkInterfaces();
// console.log(networkInterfaces);

const app = require("./app");

const DB =
  "mongodb+srv://weihaoliu99:lweihao99@test-data.dmtf82a.mongodb.net/hotel?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to mongodb"));

const PORT = 3001;
const ipv4Address = "127.0.0.1";

const server = app.listen(PORT, ipv4Address, () => {
  console.log(
    `Server is running on http://${ipv4Address}:${PORT}`,
    server.address()
  );
});
