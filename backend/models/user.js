const mongoose = require("mongoose");

// ==============================
// USER SCHEMA (structure of data)
// ==============================
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true,
    minlength: 4
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ==============================
// USER MODEL (connect schema to MongoDB)
// ==============================
const User = mongoose.model("User", userSchema);

// ==============================
// EXPORT MODEL
// ==============================
module.exports = User;
