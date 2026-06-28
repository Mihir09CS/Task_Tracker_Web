
import Task from "../models/Task.js";

class TaskRepository {
  create(data) {
    return Task.create(data);
  }

  async findAll(queryParams) {
    const {
      search,
      status,
      priority,
      sort = "createdAt",
      order = "desc",
      page = 1,
      limit = 10,
    } = queryParams;

    const filter = {};
    const dueDateFilter = {};

    // Search
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { status: { $regex: search, $options: "i" } },
        { priority: { $regex: search, $options: "i" } },
      ];
    }

    // Filter
    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    const today = new Date();

    if (queryParams.overdue === "true") {
      dueDateFilter.$lt = today;

      if (!status) {
        filter.status = { $ne: "Completed" };
      }
    }

    if (queryParams.due === "today") {
      const start = new Date();
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setHours(23, 59, 59, 999);

      if (!dueDateFilter.$gte || start > dueDateFilter.$gte) {
        dueDateFilter.$gte = start;
      }

      if (!dueDateFilter.$lte || end < dueDateFilter.$lte) {
        dueDateFilter.$lte = end;
      }
    }

    if (queryParams.upcoming) {
      const end = new Date();
      end.setDate(end.getDate() + Number(queryParams.upcoming));

      if (!dueDateFilter.$gte || today > dueDateFilter.$gte) {
        dueDateFilter.$gte = today;
      }

      if (!dueDateFilter.$lte || end < dueDateFilter.$lte) {
        dueDateFilter.$lte = end;
      }
    }

    if (Object.keys(dueDateFilter).length > 0) {
      filter.dueDate = dueDateFilter;
    }

    // Pagination
    const currentPage = Math.max(Number(page), 1);
    const pageSize = Math.max(Number(limit), 1);
    const skip = (currentPage - 1) * pageSize;

    // Sorting
    // Allowed fields for sorting
    const allowedSortFields = [
      "createdAt",
      "dueDate",
      "priority",
      "status",
      "title",
    ];

    // Use requested field only if it's allowed
    const sortField = allowedSortFields.includes(sort) ? sort : "createdAt";

    // Create sort object
    const sortOptions = {
      [sortField]: order === "asc" ? 1 : -1,
    };

    const [tasks, total] = await Promise.all([
      Task.find(filter)
        .select("-__v")
        .sort(sortOptions)
        .skip(skip)
        .limit(pageSize)
        .lean(),

      Task.countDocuments(filter),
    ]);

    return {
      tasks,
      pagination: {
        total,
        page: currentPage,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  findById(id) {
    return Task.findById(id).lean();
  }

  update(id, data) {
    return Task.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();
  }

  delete(id) {
    return Task.findByIdAndDelete(id);
  }

  async getStatistics() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const now = new Date();

    const stats = await Task.aggregate([
      {
        $facet: {
          total: [
            {
              $count: "count",
            },
          ],

          status: [
            {
              $group: {
                _id: "$status",
                count: {
                  $sum: 1,
                },
              },
            },
          ],

          priority: [
            {
              $group: {
                _id: "$priority",
                count: {
                  $sum: 1,
                },
              },
            },
          ],

          overdue: [
            {
              $match: {
                dueDate: { $lt: now },
                status: { $ne: "Completed" },
              },
            },
            {
              $count: "count",
            },
          ],

          dueToday: [
            {
              $match: {
                dueDate: {
                  $gte: today,
                  $lt: tomorrow,
                },
              },
            },
            {
              $count: "count",
            },
          ],
        },
      },
    ]);

    return stats[0];
  }
}

export default new TaskRepository();
