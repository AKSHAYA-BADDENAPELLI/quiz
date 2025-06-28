const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");
const Question = require("./models/Question");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    insertQuestions();
  })
  .catch(err => console.error("❌ DB connection error:", err));

async function insertQuestions() {
  try {
    const dataPath = path.join(__dirname, "questions.json");
    const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    await Question.deleteMany(); // Optional: clear old data
    await Question.insertMany(data);
    console.log("✅ Questions inserted successfully");
  } catch (err) {
    console.error("❌ Error inserting questions:", err);
  } finally {
    mongoose.disconnect();
  }
}
