const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const userRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");

const server = express();

server.use(express.json());
server.use(helmet());

server.use("/api/users", userRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.send("Node auth1 Project");
});

module.exports = server;
