const bcrypt = require("bcryptjs");
const router = require("express").Router();

const Users = require("../users/users-model");

// --- Register --- //

router.post("/register", (req, res) => {
  const userInfo = req.body;

  const ROUNDS = process.env.ROUNDS || 10;

  const hash = bcrypt.hashSync(userInfo.password, ROUNDS);
  userInfo.password = hash;

  Users.add(userInfo)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error adding user" });
    });
});

// --- Login --- //

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ Welcome: user.username });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Error finding user", err });
    });
});

module.exports = router;
