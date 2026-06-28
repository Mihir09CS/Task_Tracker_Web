import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { SORT_OPTIONS } from "../../constants/index.js";
import { clsx } from "clsx";

export default function SortControl({ sort, order, setParam }) {
  const toggleOrder = () => {
    setParam("order", order === "asc" ? "desc" : "asc");
  };

  return (
    <div className="flex items-center gap-1.5">
      <select
        value={sort}
        onChange={(e) => setParam("sort", e.target.value)}
        className={clsx(
          "px-3 py-2 rounded-lg border border-border dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-650 dark:text-slate-350 transition-colors duration-300",
          "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400",
          "transition-colors cursor-pointer"
        )}
        aria-label="Sort by"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">
            {opt.label}
          </option>
        ))}
      </select>

      <button
        onClick={toggleOrder}
        className={clsx(
          "p-2 rounded-lg border border-border dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 transition-colors duration-300",
          "hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200",
          "transition-colors cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        )}
        aria-label={`Sort ${order === "asc" ? "ascending" : "descending"}`}
        title={order === "asc" ? "Ascending" : "Descending"}
      >
        {order === "asc" ? (
          <ArrowUp className="w-4 h-4" />
        ) : (
          <ArrowDown className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
