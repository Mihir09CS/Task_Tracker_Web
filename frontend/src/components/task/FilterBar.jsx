import { useMemo, useCallback } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import { STATUS_OPTIONS, PRIORITY_OPTIONS, DUE_FILTER_OPTIONS } from "../../constants/index.js";
import { clsx } from "clsx";

export default function FilterBar({
  params,
  setParam,
  setMultipleParams,
  hasActiveFilters,
  clearFilters,
}) {
  const activeCount = useMemo(() => {
    let count = 0;
    if (params.status) count++;
    if (params.priority) count++;
    if (params.overdue || params.due || params.upcoming) count++;
    return count;
  }, [params]);

  const currentDueFilter = useMemo(() => {
    if (params.overdue === "true") return "overdue";
    if (params.due === "today") return "today";
    if (params.upcoming) return "upcoming";
    return "";
  }, [params]);

  const handleDueFilter = useCallback(
    (value) => {
      const updates = { overdue: "", due: "", upcoming: "" };

      if (value === "overdue") updates.overdue = "true";
      else if (value === "today") updates.due = "today";
      else if (value === "upcoming") updates.upcoming = "7";

      setMultipleParams(updates);
    },
    [setMultipleParams]
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mr-1 transition-colors duration-300">
        <SlidersHorizontal className="w-4 h-4" />
        <span className="hidden sm:inline font-medium">Filters</span>
        {activeCount > 0 && (
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 text-xs font-semibold transition-colors duration-300">
            {activeCount}
          </span>
        )}
      </div>

      <select
        value={params.status}
        onChange={(e) => setParam("status", e.target.value)}
        className={clsx(
          "px-3 py-2 rounded-lg border text-sm transition-all duration-300 cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400",
          params.status
            ? "border-primary-300 dark:border-primary-800 bg-primary-50 dark:bg-primary-950/20 text-primary-700 dark:text-primary-400"
            : "border-border dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-350"
        )}
        aria-label="Filter by status"
      >
        <option value="" className="bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400">All Status</option>
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">
            {s}
          </option>
        ))}
      </select>

      <select
        value={params.priority}
        onChange={(e) => setParam("priority", e.target.value)}
        className={clsx(
          "px-3 py-2 rounded-lg border text-sm transition-all duration-300 cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400",
          params.priority
            ? "border-primary-300 dark:border-primary-800 bg-primary-50 dark:bg-primary-950/20 text-primary-700 dark:text-primary-400"
            : "border-border dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-350"
        )}
        aria-label="Filter by priority"
      >
        <option value="" className="bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400">All Priority</option>
        {PRIORITY_OPTIONS.map((p) => (
          <option key={p} value={p} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">
            {p}
          </option>
        ))}
      </select>

      <select
        value={currentDueFilter}
        onChange={(e) => handleDueFilter(e.target.value)}
        className={clsx(
          "px-3 py-2 rounded-lg border text-sm transition-all duration-300 cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400",
          currentDueFilter
            ? "border-primary-300 dark:border-primary-800 bg-primary-50 dark:bg-primary-950/20 text-primary-700 dark:text-primary-400"
            : "border-border dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-350"
        )}
        aria-label="Filter by due date"
      >
        {DUE_FILTER_OPTIONS.map((d) => (
          <option key={d.value} value={d.value} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">
            {d.label}
          </option>
        ))}
      </select>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="inline-flex items-center gap-1 px-2.5 py-2 rounded-lg text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-350 cursor-pointer"
          aria-label="Clear all filters"
        >
          <X className="w-3.5 h-3.5" />
          Clear
        </button>
      )}
    </div>
  );
}
