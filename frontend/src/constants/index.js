export const STATUS_OPTIONS = ["Pending", "In Progress", "Completed"];
export const PRIORITY_OPTIONS = ["Low", "Medium", "High"];

export const SORT_OPTIONS = [
  { value: "createdAt", label: "Created Date" },
  { value: "dueDate", label: "Due Date" },
  { value: "priority", label: "Priority" },
  { value: "status", label: "Status" },
  { value: "title", label: "Title" },
];

export const ORDER_OPTIONS = [
  { value: "desc", label: "Newest First" },
  { value: "asc", label: "Oldest First" },
];

export const DUE_FILTER_OPTIONS = [
  { value: "", label: "All Dates" },
  { value: "overdue", label: "Overdue" },
  { value: "today", label: "Due Today" },
  { value: "upcoming", label: "Next 7 Days" },
];

export const DEFAULT_PAGE_SIZE = 10;

export const STATUS_CONFIG = {
  Pending: {
    color: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
  },
  "In Progress": {
    color: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
  },
  Completed: {
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
  },
};

export const PRIORITY_CONFIG = {
  Low: {
    color: "bg-slate-50 text-slate-600 border-slate-200",
    dot: "bg-slate-400",
  },
  Medium: {
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    dot: "bg-indigo-500",
  },
  High: {
    color: "bg-rose-50 text-rose-700 border-rose-200",
    dot: "bg-rose-500",
  },
};
