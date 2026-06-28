import { AlertTriangle, RefreshCw } from "lucide-react";
import Button from "./Button.jsx";

export default function ErrorState({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/20 flex items-center justify-center mb-4 transition-colors duration-300">
        <AlertTriangle className="w-8 h-8 text-rose-500 dark:text-rose-450 transition-colors duration-300" />
      </div>
      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1 transition-colors duration-300">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6 transition-colors duration-300">{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          <RefreshCw className="w-4 h-4" />
          Try again
        </Button>
      )}
    </div>
  );
}
