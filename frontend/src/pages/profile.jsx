import { useState, useEffect } from "react";

function Profile() {
  const [formData, setFormData] = useState({
    fullName: "",
    collegeName: "",
    branch: "",
    year: "",
    skills: "",
    bio: "",
    linkedin: "",
    github: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
  try {
    const response = await fetch("/api/profile");

    if (!response.ok) return;

    const result = await response.json();

    if (
      result.success &&
      result.profiles &&
      result.profiles.length > 0
    ) {
      const data = result.profiles[result.profiles.length - 1];

      setFormData({
        fullName: data.fullName || "",
        collegeName: data.collegeName || "",
        branch: data.branch || "",
        year: data.year || "",
        skills: data.skills ? data.skills.join(", ") : "",
        bio: data.bio || "",
        linkedin: data.linkedin || "",
        github: data.github || "",
      });
    }
  } catch (error) {
    console.error("Profile Load Error:", error);
  }
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          skills: formData.skills.split(","),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save profile");
      }

      alert("Profile Saved Successfully!");
      console.log(data);

      fetchProfile();
    } catch (error) {
      console.error("SAVE ERROR:", error);

      alert(
        "Error saving profile: " +
          (error.message === "Failed to fetch"
            ? "Backend server is not reachable."
            : error.message)
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>SkillBridge Profile</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="collegeName"
          placeholder="College Name"
          value={formData.collegeName}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="branch"
          placeholder="Branch"
          value={formData.branch}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
        />
        <br /><br />

        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn URL"
          value={formData.linkedin}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="github"
          placeholder="GitHub URL"
          value={formData.github}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;