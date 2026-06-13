const express = require("express");
const router = express.Router();

const {
  createProfile,
  getProfiles,
} = require("../controllers/profileController");

router.get("/", getProfiles);
router.post("/", createProfile);
router.post("/create", createProfile);

module.exports = router;
