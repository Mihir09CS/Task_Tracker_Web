import TaskCard from "./TaskCard.jsx";
import { SkeletonCard } from "../common/Skeleton.jsx";
import EmptyState from "../common/EmptyState.jsx";
import ErrorState from "../common/ErrorState.jsx";

export default function TaskGrid({
  tasks,
  isLoading,
  isError,
  error,
  hasActiveFilters,
  onEdit,
  onDelete,
  onRetry,
  onCreateTask,
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorState
        message={error?.message || "Failed to load tasks"}
        onRetry={onRetry}
      />
    );
  }

  if (!tasks || tasks.length === 0) {
    if (hasActiveFilters) {
      return <EmptyState preset="no-filter-results" />;
    }
    return (
      <EmptyState
        preset="no-tasks"
        actionLabel="Create Task"
        onAction={onCreateTask}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
