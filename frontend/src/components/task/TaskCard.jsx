import { memo } from "react";
import { Calendar, Clock, Pencil, Trash2 } from "lucide-react";
import { clsx } from "clsx";
import { StatusBadge, PriorityBadge } from "../common/Badge.jsx";
import { formatDate, formatRelative, isOverdue } from "../../utils/formatDate.js";

const TaskCard = memo(function TaskCard({ task, onEdit, onDelete }) {
  const overdue = isOverdue(task.dueDate) && task.status !== "Completed";

  return (
    <div
      className={clsx(
        "bg-white dark:bg-slate-900 rounded-xl border p-5 group shadow-card",
        "transition-all duration-300 will-change-transform",
        "hover:shadow-card-hover hover:-translate-y-0.5",
        overdue
          ? "border-rose-250 dark:border-rose-900/40 hover:border-rose-300 dark:hover:border-rose-800/80"
          : "border-border dark:border-slate-800 hover:border-border-hover dark:hover:border-slate-700"
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3
          className="text-sm font-semibold text-slate-800 dark:text-slate-100 line-clamp-1 flex-1 transition-colors duration-300"
          title={task.title}
        >
          {task.title}
        </h3>
        <PriorityBadge priority={task.priority} />
      </div>

      {task.description && (
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3 leading-relaxed transition-colors duration-300">
          {task.description}
        </p>
      )}

      <div className="flex items-center gap-2 mb-4">
        <StatusBadge status={task.status} />
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/60 transition-colors duration-300">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <Calendar
              className={clsx(
                "w-3.5 h-3.5",
                overdue ? "text-rose-500 dark:text-rose-400" : "text-slate-400 dark:text-slate-500"
              )}
            />
            <span
              className={clsx(
                "text-xs",
                overdue ? "text-rose-600 dark:text-rose-450 font-medium" : "text-slate-500 dark:text-slate-450"
              )}
            >
              {overdue ? "Overdue · " : "Due "}
              {formatDate(task.dueDate)}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
            <span className="text-xs text-slate-455 dark:text-slate-500">
              {formatRelative(task.createdAt)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-150">
          <button
            onClick={() => onEdit(task)}
            className="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/30 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 cursor-pointer"
            aria-label={`Edit ${task.title}`}
            title="Edit task"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task)}
            className="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all duration-300 cursor-pointer"
            aria-label={`Delete ${task.title}`}
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

export default TaskCard;
