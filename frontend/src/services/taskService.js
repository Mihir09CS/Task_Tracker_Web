import apiClient from "../lib/axios.js";

export const taskService = {
  getTasks(params = {}) {
    const cleanParams = {};
    for (const [key, value] of Object.entries(params)) {
      if (value !== "" && value !== undefined && value !== null) {
        cleanParams[key] = value;
      }
    }
    return apiClient.get("/tasks", { params: cleanParams });
  },

  getTaskById(id) {
    return apiClient.get(`/tasks/${id}`);
  },

  createTask(payload) {
    return apiClient.post("/tasks", payload);
  },

  updateTask(id, payload) {
    return apiClient.put(`/tasks/${id}`, payload);
  },

  deleteTask(id) {
    return apiClient.delete(`/tasks/${id}`);
  },

  getTaskStats() {
    return apiClient.get("/tasks/stats");
  },

  getHealth() {
    return apiClient.get("/health");
  },
};
