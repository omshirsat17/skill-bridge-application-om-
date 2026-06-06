const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config({ path: path.join(__dirname, ".env"), quiet: true });

const app = express();

app.use(express.json());

connectDB(); 

app.get("/", (req, res) => {
  res.send("SkillBridge AI Backend Running");
});

module.exports = app;
