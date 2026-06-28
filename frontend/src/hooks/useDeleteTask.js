import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "../services/taskService.js";
import { taskKeys } from "../services/queryKeys.js";
import toast from "react-hot-toast";

export function useDeleteTask(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => taskService.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
      toast.success("Task deleted successfully");
      options.onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete task");
      options.onError?.(error);
    },
  });
}
