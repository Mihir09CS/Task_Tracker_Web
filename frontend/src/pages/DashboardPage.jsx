import { useState, useCallback } from "react";
import { useTasks } from "../hooks/useTasks.js";
import { useTaskStats } from "../hooks/useTaskStats.js";
import { useCreateTask } from "../hooks/useCreateTask.js";
import { useUpdateTask } from "../hooks/useUpdateTask.js";
import { useDeleteTask } from "../hooks/useDeleteTask.js";
import { useQueryParams } from "../hooks/useQueryParams.js";

import WelcomeSection from "../components/dashboard/WelcomeSection.jsx";
import StatsSection from "../components/dashboard/StatsSection.jsx";
import TaskToolbar from "../components/task/TaskToolbar.jsx";
import TaskGrid from "../components/task/TaskGrid.jsx";
import Pagination from "../components/common/Pagination.jsx";
import TaskModal from "../components/task/TaskModal.jsx";
import ConfirmDialog from "../components/common/ConfirmDialog.jsx";

export default function DashboardPage() {
  const {
    params,
    apiParams,
    setParam,
    setMultipleParams,
    hasActiveFilters,
    clearFilters,
  } = useQueryParams();

  // Dialog & Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  // Queries & Mutations
  const {
    data: taskData,
    isLoading: tasksLoading,
    isError: tasksError,
    error: taskErrorDetails,
    refetch: refetchTasks,
  } = useTasks(apiParams);

  const {
    data: stats,
    isLoading: statsLoading,
    refetch: refetchStats,
  } = useTaskStats();

  const handleRefetchAll = useCallback(() => {
    refetchTasks();
    refetchStats();
  }, [refetchTasks, refetchStats]);

  const createTaskMutation = useCreateTask({
    onSuccess: () => {
      setIsModalOpen(false);
      handleRefetchAll();
    },
  });

  const updateTaskMutation = useUpdateTask({
    onSuccess: () => {
      setIsModalOpen(false);
      setEditingTask(null);
      handleRefetchAll();
    },
  });

  const deleteTaskMutation = useDeleteTask({
    onSuccess: () => {
      setDeletingTask(null);
      handleRefetchAll();
    },
  });

  // Event Handlers
  const handleOpenCreateModal = useCallback(() => {
    setEditingTask(null);
    setIsModalOpen(true);
  }, []);

  const handleOpenEditModal = useCallback((task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  }, []);

  const handleOpenDeleteDialog = useCallback((task) => {
    setDeletingTask(task);
  }, []);

  const handleModalSubmit = useCallback(
    (payload) => {
      if (editingTask) {
        updateTaskMutation.mutate({ id: editingTask._id, payload });
      } else {
        createTaskMutation.mutate(payload);
      }
    },
    [editingTask, createTaskMutation, updateTaskMutation]
  );

  const handleDeleteConfirm = useCallback(() => {
    if (deletingTask) {
      deleteTaskMutation.mutate(deletingTask._id);
    }
  }, [deletingTask, deleteTaskMutation]);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <WelcomeSection
        stats={stats}
        onCreateTask={handleOpenCreateModal}
      />

      {/* Metrics Section */}
      <StatsSection stats={stats} isLoading={statsLoading} />

      {/* Filter and Control Toolbar */}
      <TaskToolbar
        params={params}
        setParam={setParam}
        setMultipleParams={setMultipleParams}
        hasActiveFilters={hasActiveFilters}
        clearFilters={clearFilters}
      />

      {/* Main Task List Grid */}
      <TaskGrid
        tasks={taskData?.tasks}
        isLoading={tasksLoading}
        isError={tasksError}
        error={taskErrorDetails}
        hasActiveFilters={hasActiveFilters}
        onEdit={handleOpenEditModal}
        onDelete={handleOpenDeleteDialog}
        onRetry={handleRefetchAll}
        onCreateTask={handleOpenCreateModal}
      />

      {/* Pagination Footer */}
      {taskData?.pagination && (
        <Pagination
          pagination={taskData.pagination}
          onPageChange={(page) => setParam("page", page)}
        />
      )}

      {/* Task Creation / Edit Form Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleModalSubmit}
        isLoading={createTaskMutation.isPending || updateTaskMutation.isPending}
        task={editingTask}
      />

      {/* Task Deletion Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deletingTask}
        onClose={() => setDeletingTask(null)}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteTaskMutation.isPending}
        taskTitle={deletingTask?.title}
      />
    </div>
  );
}
