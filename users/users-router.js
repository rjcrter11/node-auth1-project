const express = require("express");
const router = express.Router();
const Users = require("./users-model");

router.get("/", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ success: false, err });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Users.findById(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ success: false, err });
    });
});

module.exports = router;
