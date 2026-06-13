const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  collegeName: {
    type: String,
    required: true,
    trim: true,
  },
  branch: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: String,
    required: true,
    trim: true,
  },
  skills: [String],
  bio: {
    type: String,
    default: "",
    trim: true,
  },
  linkedin: {
    type: String,
    default: "",
    trim: true,
  },
  github: {
    type: String,
    default: "",
    trim: true,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
