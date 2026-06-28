import { forwardRef } from "react";
import { clsx } from "clsx";
import { ChevronDown } from "lucide-react";

const Select = forwardRef(function Select(
  { label, error, options = [], placeholder, className, id, ...props },
  ref
) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors duration-300"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={clsx(
            "w-full appearance-none rounded-lg border border-border dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2.5 pr-10 text-sm text-slate-800 dark:text-slate-100 transition-colors duration-300",
            "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400",
            "disabled:bg-slate-50 dark:disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed",
            "cursor-pointer",
            error && "border-rose-400 dark:border-rose-550 focus:ring-rose-500/20 focus:border-rose-400",
            className
          )}
          aria-invalid={error ? "true" : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" className="bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500">
              {placeholder}
            </option>
          )}
          {options.map((opt) => {
            const value = typeof opt === "string" ? opt : opt.value;
            const label = typeof opt === "string" ? opt : opt.label;
            return (
              <option key={value} value={value} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">
                {label}
              </option>
            );
          })}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
      </div>
      {error && (
        <p className="text-xs text-rose-600 dark:text-rose-400">{error}</p>
      )}
    </div>
  );
});

export default Select;
