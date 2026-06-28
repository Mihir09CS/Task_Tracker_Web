import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../hooks/useTheme.js";
import { clsx } from "clsx";

export default function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        "p-2 rounded-lg border transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500/20",
        isDark
          ? "border-slate-800 bg-slate-900 text-amber-400 hover:bg-slate-800 hover:text-amber-300"
          : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800",
        className
      )}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light Mode" : "Dark Mode"}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Sun
          className={clsx(
            "w-5 h-5 absolute transition-transform duration-300",
            isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
          )}
        />
        <Moon
          className={clsx(
            "w-5 h-5 absolute transition-transform duration-300",
            isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          )}
        />
      </div>
    </button>
  );
}
