import { useQuery } from "@tanstack/react-query";
import { taskService } from "../services/taskService.js";
import { taskKeys } from "../services/queryKeys.js";

export function useTaskStats() {
  return useQuery({
    queryKey: taskKeys.stats,
    queryFn: () => taskService.getTaskStats(),
    select: (response) => response.data,
    staleTime: 60 * 1000,
  });
}
