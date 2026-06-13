const Profile = require("../models/Profile");

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
  const fullName = body.fullName && String(body.fullName).trim();
  const collegeName = body.collegeName && String(body.collegeName).trim();
  const branch = body.branch && String(body.branch).trim();
  const year = body.year && String(body.year).trim();

  if (!fullName || !collegeName || !branch || !year) {
    return {
      error: "fullName, collegeName, branch, and year are required",
    };
  }

  return {
    data: {
      fullName,
      collegeName,
      branch,
      year,
      skills: toStringArray(body.skills),
      bio: body.bio ? String(body.bio).trim() : "",
      linkedin: body.linkedin ? String(body.linkedin).trim() : "",
      github: body.github ? String(body.github).trim() : "",
    },
  };
};

// Create Profile
const createProfile = async (req, res) => {
  try {
    const { data, error } = getProfilePayload(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    }

    const profile = await Profile.create(data);

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while creating profile",
      error: error.message,
    });
  }
};

// Get All Profiles
const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();

    res.status(200).json({
      success: true,
      profiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching profiles",
      error: error.message,
    });
  }
};

module.exports = {
  createProfile,
  getProfiles,
};
