const express = require("express");
const { newUser, verifiedUser, login } = require("../../controllers/userController");
const router = express.Router();

router.post("/registration", newUser);
router.post("/verifyUser", verifiedUser);
router.post("/login", login);

module.exports = router;
