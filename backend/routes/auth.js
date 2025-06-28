const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "User already exists" });
  const hashed = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashed });
  res.json({ message: "Registered successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    res.json({ success: true, email });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
