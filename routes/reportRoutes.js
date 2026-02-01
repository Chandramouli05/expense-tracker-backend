const express = require("express");

const router = express.Router();

const { downloadReport } = require("../controllers/reportController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/download", authMiddleware, downloadReport);

module.exports = router;
