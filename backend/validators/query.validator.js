import { query } from "express-validator";

export const taskQueryValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),

  query("status")
    .optional()
    .isIn(["Pending", "In Progress", "Completed"])
    .withMessage("Invalid status"),

  query("priority")
    .optional()
    .isIn(["Low", "Medium", "High"])
    .withMessage("Invalid priority"),

  query("sort")
    .optional()
    .isIn(["createdAt", "dueDate", "priority", "status", "title"])
    .withMessage("Invalid sort field"),

  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Order must be asc or desc"),

  query("search")
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Search must be between 1 and 100 characters"),

  query("overdue")
    .optional()
    .isBoolean()
    .withMessage("Overdue must be true or false"),

  query("due")
    .optional()
    .isIn(["today"])
    .withMessage("Due supports only 'today'"),

  query("upcoming")
    .optional()
    .isInt({ min: 1, max: 365 })
    .withMessage("Upcoming must be between 1 and 365 days"),
];
