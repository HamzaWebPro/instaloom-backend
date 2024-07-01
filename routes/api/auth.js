const express = require("express");
const { newUser } = require("../../controllers/userController");
const router = express.Router();

router.post("/auth", newUser);

module.exports = router;
