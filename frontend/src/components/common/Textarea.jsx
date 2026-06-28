import { forwardRef } from "react";
import { clsx } from "clsx";

const Textarea = forwardRef(function Textarea(
  { label, error, maxLength, value, className, id, ...props },
  ref
) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");
  const charCount = typeof value === "string" ? value.length : 0;

  return (
    <div className="space-y-1.5">
      {label && (
        <div className="flex items-center justify-between">
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors duration-300"
          >
            {label}
          </label>
          {maxLength && (
            <span
              className={clsx(
                "text-xs transition-colors duration-300",
                charCount > maxLength ? "text-rose-600 dark:text-rose-400" : "text-slate-400 dark:text-slate-500"
              )}
            >
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        value={value}
        rows={3}
        className={clsx(
          "w-full rounded-lg border border-border dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 transition-colors duration-300",
          "placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none",
          "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400",
          "disabled:bg-slate-50 dark:disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed",
          error && "border-rose-400 dark:border-rose-500 focus:ring-rose-500/20 focus:border-rose-400",
          className
        )}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${textareaId}-error`} className="text-xs text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
});

export default Textarea;
