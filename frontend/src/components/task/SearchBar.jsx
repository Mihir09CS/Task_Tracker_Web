import { useState, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import { useDebounce } from "../../hooks/useDebounce.js";
import { clsx } from "clsx";

export default function SearchBar({ value, onChange }) {
  const [localValue, setLocalValue] = useState(value || "");
  const debouncedValue = useDebounce(localValue, 400);

  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, onChange, value]);

  useEffect(() => {
    setLocalValue(value || "");
  }, [value]);

  const handleClear = useCallback(() => {
    setLocalValue("");
    onChange("");
  }, [onChange]);

  return (
    <div className="relative flex-1 min-w-0">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-550" />
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder="Search tasks..."
        className={clsx(
          "w-full pl-10 pr-9 py-2.5 rounded-lg border border-border dark:border-slate-850 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 transition-colors duration-300",
          "placeholder:text-slate-400 dark:placeholder:text-slate-550",
          "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400",
          "transition-colors duration-150"
        )}
        aria-label="Search tasks"
      />
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
