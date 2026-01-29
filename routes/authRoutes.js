const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.post("/refresh", controller.refreshToken);
router.post("/logout", controller.logout);
router.get("/getuser", authMiddleware, controller.getUser);

module.exports = router;
