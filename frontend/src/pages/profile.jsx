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

      const data = await response.json();

      if (data.profiles && data.profiles.length > 0) {
        const profile = data.profiles[data.profiles.length - 1];

        setFormData({
          fullName: profile.fullName || "",
          collegeName: profile.collegeName || "",
          branch: profile.branch || "",
          year: profile.year || "",
          skills: profile.skills
            ? profile.skills.join(", ")
            : "",
          bio: profile.bio || "",
          linkedin: profile.linkedin || "",
          github: profile.github || "",
        });
      }
    } catch (error) {
      console.error(error);
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
        throw new Error(data.message);
      }

      alert("Profile Saved Successfully!");
      fetchProfile();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-8 shadow-lg mb-8">
        <h1 className="text-4xl font-bold">
          👤 Profile Management
        </h1>
        <p className="mt-2 text-lg">
          Update and manage your SkillBridge profile.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 transition dark:bg-slate-900">
        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block font-semibold mb-2 text-slate-800 dark:text-slate-200">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-slate-800 dark:text-slate-200">
              College Name
            </label>

            <input
              type="text"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-slate-800 dark:text-slate-200">
              Branch
            </label>

            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-slate-800 dark:text-slate-200">
              Year
            </label>

            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold mb-2 text-slate-800 dark:text-slate-200">
              Skills
            </label>

            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="HTML, CSS, JavaScript, React"
              className="w-full border rounded-lg p-3 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold mb-2 text-slate-800 dark:text-slate-200">
              Bio
            </label>

            <textarea
              name="bio"
              rows="4"
              value={formData.bio}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-slate-800 dark:text-slate-200">
              LinkedIn URL
            </label>

            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-slate-800 dark:text-slate-200">
              GitHub URL
            </label>

            <input
              type="text"
              name="github"
              value={formData.github}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
