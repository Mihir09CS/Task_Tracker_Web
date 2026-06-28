import { body } from "express-validator";

export const createTaskValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),

  body("priority")
    .optional()
    .isIn(["Low", "Medium", "High"])
    .withMessage("Invalid priority"),

  body("status")
    .optional()
    .isIn(["Pending", "In Progress", "Completed"])
    .withMessage("Invalid status"),

  body("dueDate")
    .notEmpty()
    .withMessage("Due date is required")
    .isISO8601()
    .withMessage("Invalid date"),
];

export const updateTaskValidator = [
  body("title").optional().trim().isLength({ min: 3, max: 100 }),

  body("description").optional().trim().isLength({ max: 500 }),

  body("priority").optional().isIn(["Low", "Medium", "High"]),

  body("status").optional().isIn(["Pending", "In Progress", "Completed"]),

  body("dueDate").optional().isISO8601(),
];
