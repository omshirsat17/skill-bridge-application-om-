const Job = require("../models/Job");

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

const getJobPayload = (body) => {
  const title = body.title && String(body.title).trim();
  const company = body.company && String(body.company).trim();
  const location = body.location && String(body.location).trim();

  if (!title || !company || !location) {
    return {
      error: "title, company, and location are required",
    };
  }

  return {
    data: {
      title,
      company,
      location,
      description: body.description ? String(body.description).trim() : "",
      skills: toStringArray(body.skills),
      type: body.type ? String(body.type).trim() : "Full-time",
      salary: body.salary ? String(body.salary).trim() : "",
      applyLink: body.applyLink ? String(body.applyLink).trim() : "",
    },
  };
};

const createJob = async (req, res) => {
  try {
    const { data, error } = getJobPayload(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    }

    const job = await Job.create(data);

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while creating job",
      error: error.message,
    });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching jobs",
      error: error.message,
    });
  }
};

module.exports = {
  createJob,
  getJobs,
};
