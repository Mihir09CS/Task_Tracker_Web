import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "../services/taskService.js";
import { taskKeys } from "../services/queryKeys.js";
import toast from "react-hot-toast";

export function useCreateTask(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => taskService.createTask(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
      toast.success("Task created successfully");
      options.onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create task");
      options.onError?.(error);
    },
  });
}
