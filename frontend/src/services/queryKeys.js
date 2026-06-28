export const taskKeys = {
  all: ["tasks"],
  lists: (filters) => ["tasks", "list", filters],
  detail: (id) => ["tasks", "detail", id],
  stats: ["tasks", "stats"],
};
