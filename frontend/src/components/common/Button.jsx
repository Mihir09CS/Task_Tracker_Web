import { forwardRef } from "react";
import { clsx } from "clsx";
import { Loader2 } from "lucide-react";

const variants = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500 shadow-sm",
  secondary:
    "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-border dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-border-hover dark:hover:border-slate-700 focus-visible:ring-primary-500",
  danger:
    "bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-500 shadow-sm",
  ghost:
    "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200 focus-visible:ring-primary-500",
  outline:
    "border border-primary-300 dark:border-primary-800 text-primary-700 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/30 focus-visible:ring-primary-500",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-5 py-2.5 text-base gap-2",
};

const Button = forwardRef(function Button(
  {
    children,
    variant = "primary",
    size = "md",
    isLoading = false,
    disabled = false,
    className,
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={clsx(
        "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "cursor-pointer",
        "active:scale-[0.98]",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
});

export default Button;
