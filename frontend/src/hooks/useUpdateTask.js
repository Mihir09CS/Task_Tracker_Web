import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "../services/taskService.js";
import { taskKeys } from "../services/queryKeys.js";
import toast from "react-hot-toast";

export function useUpdateTask(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => taskService.updateTask(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
      toast.success("Task updated successfully");
      options.onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update task");
      options.onError?.(error);
    },
  });
}
