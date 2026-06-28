import { forwardRef } from "react";
import { clsx } from "clsx";

const Input = forwardRef(function Input(
  { label, error, icon: Icon, className, id, ...props },
  ref
) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors duration-300"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            "w-full rounded-lg border border-border dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 transition-colors duration-300",
            "placeholder:text-slate-400 dark:placeholder:text-slate-500",
            "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400",
            "disabled:bg-slate-50 dark:disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed",
            error && "border-rose-400 dark:border-rose-500 focus:ring-rose-500/20 focus:border-rose-400",
            Icon && "pl-10",
            className
          )}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
      </div>
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-rose-600 dark:text-rose-400 mt-1">
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;
