const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

router.get("/questions", async (req, res) => {
  const allQuestions = await Question.find();
  const shuffled = allQuestions.sort(() => 0.5 - Math.random());
  res.json(shuffled.slice(0, 10));
});

module.exports = router;
