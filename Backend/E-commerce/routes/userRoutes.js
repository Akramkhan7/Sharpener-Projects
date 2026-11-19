const express = require("express");
const router = express.Router();
const {
  getUser,
  createUser,
  getUserById,
} = require("../controllers/userController");


router.get("/", getUser);

router.post("/", createUser);

router.get("/:id", getUserById);

module.exports = router;
