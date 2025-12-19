const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");

exports.post = async (req, res) => {
  try {
    const { email, password } = req.body; 

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not Found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ userId: user._id }, "SECRET_KEY", {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
