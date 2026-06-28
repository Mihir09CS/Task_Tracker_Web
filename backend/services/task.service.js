import taskRepository from "../repositories/task.repository.js";
import ApiError from "../utils/ApiError.js";
import validateObjectId from "../utils/validateObjectId.js";

const ALLOWED_UPDATE_FIELDS = [
  "title",
  "description",
  "priority",
  "status",
  "dueDate",
];

const sanitizeUpdatePayload = (data) => {
  const sanitizedData = {};

  for (const [key, value] of Object.entries(data ?? {})) {
    if (key.startsWith("$") || key.includes(".")) {
      throw new ApiError(400, "Invalid update payload");
    }

    if (ALLOWED_UPDATE_FIELDS.includes(key)) {
      sanitizedData[key] = value;
    }
  }

  return sanitizedData;
};

class TaskService {
  async createTask(data) {
    return await taskRepository.create(data);
  }

  async getAllTasks(queryParams) {
    return await taskRepository.findAll(queryParams);
  }

  async getTaskById(id) {
    validateObjectId(id);

    const task = await taskRepository.findById(id);

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    return task;
  }

  async updateTask(id, data) {
    validateObjectId(id);

    const sanitizedData = sanitizeUpdatePayload(data);
    const updatedTask = await taskRepository.update(id, sanitizedData);

    if (!updatedTask) {
      throw new ApiError(404, "Task not found");
    }

    return updatedTask;
  }

  async deleteTask(id) {
    validateObjectId(id);

    const deletedTask = await taskRepository.delete(id);

    if (!deletedTask) {
      throw new ApiError(404, "Task not found");
    }

    return deletedTask;
  }

  async getStatistics() {
    return await taskRepository.getStatistics();
  }
}

export default new TaskService();
