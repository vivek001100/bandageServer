const express = require("express");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get(
  "/getDetail",
  authController.verifyToken,
  authController.protect,
  authController.getUserDetail
);

module.exports = router;
