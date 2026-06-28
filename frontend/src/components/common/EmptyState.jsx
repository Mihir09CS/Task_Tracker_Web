import { Inbox, SearchX, FilterX } from "lucide-react";
import Button from "./Button.jsx";

const presets = {
  "no-tasks": {
    icon: Inbox,
    title: "No tasks yet",
    description: "Create your first task to get started with TaskTracker.",
  },
  "no-results": {
    icon: SearchX,
    title: "No results found",
    description: "Try adjusting your search or filter criteria.",
  },
  "no-filter-results": {
    icon: FilterX,
    title: "No matching tasks",
    description: "No tasks match the current filters. Try clearing some filters.",
  },
};

export default function EmptyState({
  preset,
  icon: CustomIcon,
  title,
  description,
  actionLabel,
  onAction,
}) {
  const config = preset ? presets[preset] : {};
  const Icon = CustomIcon || config.icon || Inbox;
  const displayTitle = title || config.title || "Nothing here";
  const displayDescription = description || config.description || "";

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 transition-colors duration-300">
        <Icon className="w-8 h-8 text-slate-400 dark:text-slate-500 transition-colors duration-300" />
      </div>
      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1 transition-colors duration-300">
        {displayTitle}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-450 max-w-sm mb-6 transition-colors duration-300">
        {displayDescription}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} size="md">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
