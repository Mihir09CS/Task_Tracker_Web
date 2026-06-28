import asyncHandler from "../middlewares/asyncHandler.js";
import taskService from "../services/task.service.js";
import ApiResponse from "../utils/ApiResponse.js";

export const createTask = asyncHandler(async (req, res) => {
  const task = await taskService.createTask(req.body);

  res.status(201).json(new ApiResponse(201, "Task created successfully", task));
});

export const getAllTasks = asyncHandler(async (req, res) => {
  const result = await taskService.getAllTasks(req.query);

  res
    .status(200)
    .json(new ApiResponse(200, "Tasks fetched successfully", result));
});
export const getTaskById = asyncHandler(async (req, res) => {
  const task = await taskService.getTaskById(req.params.id);

  res.status(200).json(new ApiResponse(200, "Task fetched successfully", task));
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await taskService.updateTask(req.params.id, req.body);

  res.status(200).json(new ApiResponse(200, "Task updated successfully", task));
});

export const deleteTask = asyncHandler(async (req, res) => {
  await taskService.deleteTask(req.params.id);

  res.status(200).json(new ApiResponse(200, "Task deleted successfully"));
});

export const getStatistics = asyncHandler(async (req, res) => {
  const stats = await taskService.getStatistics();

  const response = {
    total: stats.total[0]?.count || 0,

    pending: stats.status.find((item) => item._id === "Pending")?.count || 0,

    inProgress:
      stats.status.find((item) => item._id === "In Progress")?.count || 0,

    completed:
      stats.status.find((item) => item._id === "Completed")?.count || 0,

    highPriority:
      stats.priority.find((item) => item._id === "High")?.count || 0,

    mediumPriority:
      stats.priority.find((item) => item._id === "Medium")?.count || 0,

    lowPriority: stats.priority.find((item) => item._id === "Low")?.count || 0,

    overdue: stats.overdue[0]?.count || 0,

    dueToday: stats.dueToday[0]?.count || 0,
  };

  const total = response.total;

  response.completionRate =
    total === 0 ? 0 : Number(((response.completed / total) * 100).toFixed(1));

  response.pendingPercentage =
    total === 0 ? 0 : Number(((response.pending / total) * 100).toFixed(1));

  res
    .status(200)
    .json(new ApiResponse(200, "Statistics fetched successfully", response));
});
