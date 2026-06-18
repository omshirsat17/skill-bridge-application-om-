import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Profile from "./pages/profile";

const pages = {
  dashboard: Dashboard,
  jobs: Jobs,
  profile: Profile,
};

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  const ActivePage = pages[activePage];
  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", theme);
  }, [isDark, theme]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition dark:bg-slate-950 dark:text-slate-100">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white px-5 py-6 transition dark:border-slate-800 dark:bg-slate-900 md:block">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
            SkillBridge
          </h1>
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          >
            {isDark ? "Light" : "Dark"}
          </button>
        </div>
        <nav className="mt-8 space-y-2">
          {Object.keys(pages).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setActivePage(page)}
              className={`w-full rounded-lg px-4 py-3 text-left text-sm font-semibold capitalize transition ${
                activePage === page
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              }`}
            >
              {page}
            </button>
          ))}
        </nav>
      </aside>

      <main className="min-h-screen px-4 py-6 md:ml-64 md:px-8">
        <div className="mb-6 flex items-center justify-between gap-3 md:hidden">
          <div className="flex gap-2">
            {Object.keys(pages).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setActivePage(page)}
                className={`rounded-lg px-3 py-2 text-sm font-semibold capitalize ${
                  activePage === page
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-200"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
            {isDark ? "Light" : "Dark"}
          </button>
        </div>

        <ActivePage />
      </main>
    </div>
  );
}

export default App;
