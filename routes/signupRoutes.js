const express = require("express");
const router = express.Router();
const controller = require("../controllers/signupController");

router.post("/", controller.post);

module.exports = router ;
