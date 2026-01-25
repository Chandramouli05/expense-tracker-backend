const express = require("express");
const router = express.Router();

const controller = require(".././controllers/savingsController");
const authMiddleware = require(".././middlewares/authMiddleware");

router.get("/", authMiddleware, controller.getAll);
router.post("/", authMiddleware, controller.create);
router.put("/:id", authMiddleware, controller.update);
router.delete("/:id", authMiddleware, controller.delete);

module.exports = router;
