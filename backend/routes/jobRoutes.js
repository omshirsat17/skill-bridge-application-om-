const express = require("express");
const router = express.Router();

const { createJob, getJobs } = require("../controllers/jobController");

router.get("/", getJobs);
router.post("/", createJob);
router.post("/create", createJob);

module.exports = router;
