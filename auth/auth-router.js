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
    .then((newUser) => {
      req.session.user = newUser; // Add here as well to save session on register
      res.status(200).json(newUser);
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
        req.session.user = {
          id: user.id,
          username: user.username
        };
        // --- req.session.user = user;
        // sends the same thing as the one above, but doesn't send it along w/ session data to console logs
        res.status(200).json({ Welcome: user.username });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Error finding user", err });
    });
});

// --- Logout --- //

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: "you aint do it right" });
      } else {
        res.status(200).json({ message: "successfully logged out" });
      }
    });
  } else {
    res.status(200).json({ message: "you already logged out fool" });
  }
});

module.exports = router;
