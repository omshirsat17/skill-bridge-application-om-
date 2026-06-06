const express = require("express");
const router = express.Router();

const Student = require("../models/Student");
const protect = require("../middleware/authMiddleware");


// ==============================
// CREATE STUDENT PROFILE
// ==============================
router.post("/create", protect, async (req, res) => {
  try {
    const { college, branch, year, skills, projects, resumeLink } = req.body;

    const student = await Student.create({
      userId: req.user.id,
      college,
      branch,
      year,
      skills,
      projects,
      resumeLink,
    });

    res.status(201).json({
      message: "Student profile created successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});


// ==============================
// GET STUDENT PROFILE
// ==============================
router.get("/profile", protect, async (req, res) => {
  try {
    const student = await Student.findOne({
      userId: req.user.id,
    });

    if (!student) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});


// ==============================
// UPDATE STUDENT PROFILE
// ==============================
router.put("/update", protect, async (req, res) => {
  try {
    const { college, branch, year, skills, projects, resumeLink } = req.body;

    const student = await Student.findOneAndUpdate(
      { userId: req.user.id },
      {
        college,
        branch,
        year,
        skills,
        projects,
        resumeLink,
      },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});


// ==============================
// DELETE STUDENT PROFILE
// ==============================
router.delete("/delete", protect, async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({
      userId: req.user.id,
    });

    if (!student) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.status(200).json({
      message: "Profile deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});


// ==============================
// EXPORT ROUTER
// ==============================
module.exports = router;