import { useMemo } from "react";
import {
  Sparkles,
  Sun,
  Moon,
  CloudSun,
} from "lucide-react";
import Button from "../common/Button.jsx";
import { Plus } from "lucide-react";

export default function WelcomeSection({ stats, onCreateTask }) {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: "Good morning", Icon: Sun };
    if (hour < 17) return { text: "Good afternoon", Icon: CloudSun };
    return { text: "Good evening", Icon: Moon };
  }, []);

  const summaryText = useMemo(() => {
    if (!stats) return "Loading your dashboard...";

    const parts = [];
    if (stats.pending > 0) parts.push(`${stats.pending} pending`);
    if (stats.overdue > 0) parts.push(`${stats.overdue} overdue`);
    if (stats.dueToday > 0) parts.push(`${stats.dueToday} due today`);

    if (parts.length === 0) {
      return stats.total > 0
        ? "All caught up! Great work."
        : "Get started by creating your first task.";
    }

    return `You have ${parts.join(", ")}.`;
  }, [stats]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <greeting.Icon className="w-5 h-5 text-amber-500 dark:text-amber-400" />
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight transition-colors duration-300">
            {greeting.text}
          </h1>
          <Sparkles className="w-5 h-5 text-amber-400 dark:text-amber-300" />
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300">{summaryText}</p>
      </div>
      <Button onClick={onCreateTask} className="shrink-0">
        <Plus className="w-4 h-4" />
        New Task
      </Button>
    </div>
  );
}
