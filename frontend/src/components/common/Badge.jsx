import { clsx } from "clsx";
import { STATUS_CONFIG, PRIORITY_CONFIG } from "../../constants/index.js";

const DARK_STATUS_MAP = {
  Pending: "dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/40",
  "In Progress": "dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/40",
  Completed: "dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/40",
};

const DARK_PRIORITY_MAP = {
  Low: "dark:bg-slate-800/30 dark:text-slate-400 dark:border-slate-700/40",
  Medium: "dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-900/40",
  High: "dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/40",
};

export function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status];
  if (!config) return null;

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors duration-300",
        config.color,
        DARK_STATUS_MAP[status]
      )}
    >
      <span className={clsx("w-1.5 h-1.5 rounded-full transition-colors duration-300", config.dot)} />
      {status}
    </span>
  );
}

export function PriorityBadge({ priority }) {
  const config = PRIORITY_CONFIG[priority];
  if (!config) return null;

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors duration-300",
        config.color,
        DARK_PRIORITY_MAP[priority]
      )}
    >
      <span className={clsx("w-1.5 h-1.5 rounded-full transition-colors duration-300", config.dot)} />
      {priority}
    </span>
  );
}
