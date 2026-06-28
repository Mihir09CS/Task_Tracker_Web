import express from "express";

import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getStatistics,
} from "../controllers/task.controller.js";

import validate from "../middlewares/validate.middleware.js";

import { taskQueryValidator } from "../validators/query.validator.js";

import {
  createTaskValidator,
  updateTaskValidator,
} from "../validators/task.validator.js";

const router = express.Router();

router.get("/stats", getStatistics);

router
  .route("/")
  .get(taskQueryValidator, validate, getAllTasks)
  .post(createTaskValidator, validate, createTask);

router
  .route("/:id")
  .get(getTaskById)
  .put(updateTaskValidator, validate, updateTask)
  .delete(deleteTask);

export default router;
