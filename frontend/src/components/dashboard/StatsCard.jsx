import { clsx } from "clsx";

export default function StatsCard({ icon: Icon, label, value, color, className }) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
    amber: "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
    indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400",
    emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
    rose: "bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400",
    slate: "bg-slate-100 text-slate-600 dark:bg-slate-800/30 dark:text-slate-400",
    purple: "bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400",
    cyan: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/30 dark:text-cyan-400",
  };

  return (
    <div
      className={clsx(
        "bg-white dark:bg-slate-900 rounded-xl border border-border dark:border-slate-800 p-4 sm:p-5",
        "shadow-card transition-all duration-300 ease-out will-change-transform",
        "hover:shadow-card-hover dark:hover:shadow-indigo-950/10 hover:-translate-y-1",
        "group",
        className
      )}
    >
      <div className="flex items-center justify-between mb-2.5">
        <div
          className={clsx(
            "w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-105",
            colorMap[color] || colorMap.blue
          )}
        >
          <Icon className="w-[18px] h-[18px]" />
        </div>
        <span className="text-2xl font-bold text-slate-800 dark:text-slate-100 tabular-nums transition-colors duration-300">
          {value ?? "--"}
        </span>
      </div>
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider transition-colors duration-300">
        {label}
      </p>
    </div>
  );
}
