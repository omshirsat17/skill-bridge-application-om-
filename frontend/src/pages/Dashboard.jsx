function Dashboard() {
  return (
    <section className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-lg transition dark:bg-slate-900">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
          Student Workspace
        </p>
        <h1 className="mt-2 text-4xl font-bold text-slate-950 dark:text-white">
          SkillBridge Dashboard
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
          Track your profile, discover suitable roles, and keep your skills ready
          for the next opportunity.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Profile strength", "72%", "Complete your skills and links"],
          ["Open jobs", "18", "New opportunities this week"],
          ["Saved roles", "5", "Review before applying"],
        ].map(([label, value, helper]) => (
          <article
            key={label}
            className="rounded-2xl bg-white p-5 shadow-lg transition dark:bg-slate-900"
          >
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              {label}
            </p>
            <p className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
              {value}
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {helper}
            </p>
          </article>
        ))}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-lg transition dark:bg-slate-900">
        <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
          Next Steps
        </h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {[
            "Update your profile bio",
            "Add at least five technical skills",
            "Check new job recommendations",
            "Save roles you want to apply for",
          ].map((task) => (
            <div
              key={task}
              className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition dark:border-slate-700 dark:text-slate-200"
            >
              {task}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
