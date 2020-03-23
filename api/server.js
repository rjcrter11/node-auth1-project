const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const userRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");
const restricted = require("../auth/restricted-middleware");
const db = require("../data/db-config");

const server = express();

const sessionConfig = {
  name: "Cookie joke",
  secret: process.env.SESSION_COOKIE || "did it all for the cookie",
  cookie: {
    maxAge: 1000 * 60 * 60 * 3,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: true,
  // where do we store our sessions?
  store: new KnexSessionStore({
    knex: db,
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
};

server.use(express.json());
server.use(helmet());
server.use(session(sessionConfig));

server.use("/api/users", restricted, userRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.send("Node auth1 Project");
});

module.exports = server;
