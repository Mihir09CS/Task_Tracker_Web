import { useQuery } from "@tanstack/react-query";
import { taskService } from "../services/taskService.js";
import { taskKeys } from "../services/queryKeys.js";

export function useTasks(params = {}) {
  return useQuery({
    queryKey: taskKeys.lists(params),
    queryFn: () => taskService.getTasks(params),
    select: (response) => response.data,
    placeholderData: (prev) => prev,
  });
}
