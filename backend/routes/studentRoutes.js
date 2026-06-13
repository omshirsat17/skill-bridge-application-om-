const express = require("express");
const router = express.Router();

const Student = require("../models/Student");
const protect = require("../middleware/authMiddleware");

const toStringArray = (value) => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const getProfilePayload = (body) => {
  const college = body.college && String(body.college).trim();
  const branch = body.branch && String(body.branch).trim();
  const year = body.year && String(body.year).trim();

  if (!college || !branch || !year) {
    return {
      error: "College, branch, and year are required",
    };
  }

  return {
    data: {
      college,
      branch,
      year,
      skills: toStringArray(body.skills),
      projects: toStringArray(body.projects),
      resumeLink: body.resumeLink ? String(body.resumeLink).trim() : "",
    },
  };
};

// ==============================
// CREATE STUDENT PROFILE
// ==============================
router.post("/create", protect, async (req, res) => {
  try {
    const { data, error } = getProfilePayload(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }

    const existingStudent = await Student.findOne({ userId: req.user.id });

    if (existingStudent) {
      return res.status(400).json({
        message: "Student profile already exists. Please update it instead.",
      });
    }

    const student = await Student.create({
      userId: req.user.id,
      ...data,
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
    const { data, error } = getProfilePayload(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }

    const student = await Student.findOneAndUpdate(
      { userId: req.user.id },
      data,
      { new: true, runValidators: true }
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
