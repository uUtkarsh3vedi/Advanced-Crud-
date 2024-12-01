const Task = require("../models/task");

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status, assignedTo } =
      req.body;

    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      status,
      assignedTo,
      createdBy: req.user.id,
    });

    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error("Create Task Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const readTasks = async () => {
  const { status, priority, sortBy, assignedTo } = req.query;

  try {
    const filters = {};
    if (status) filters.status = status;
    if (priority) filters.priority = priority;
    if (assignedTo) filters.assignedTo = assignedTo;
    const sortOptions = {};
    if (sortBy) {
      const [key, order] = sortBy.split(":");
      sortOptions[key] = order === "desc" ? -1 : 1;
    }
    const tasks = await Task.find(filters).sort(sortOptions);
    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Read Task Error", error.message);
    res.status(500).json({ message: "Server Error " });
  }
};

const updateTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const task = await Task.findByIdAndUpdate(id, updates, { new: true });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error("Update task erorr ", error.message);
    res.status(500).json({ message: "Server Error " });
  }
};

const deleteTasks = async (req, res) => {
  try {
    const { id } = req.body;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(400).json({ message: "Task Not found" });
    }
    res.status(200).json({ message: "Task deleted successfull" });
  } catch (error) {
    console.error("Delete Task Error", error.message);
    res.status(500).json({ message: "Server Error " });
  }
};

const fetchTasks = async (req, res) => {
  try {
    const { status, priority, startDate, endDate, search } = req.query;
    const query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (startDate || endDate) {
      if (startDate) query.dueDate.$gte = new Date(startDate);
      if (endDate) query.dueDate.$lte = new Date(endDate);
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, options: "i" } },
      ];
    }
    const limit = parseInt(limitParam,10)||10;
    const page = parseInt(pageParam,10) || 1;
    
    const tasks = await Task.find(query).sort({dueDate:1}).skip((page-1)*limit).limit(limit)
    
    const totaTasks = await Task.countDocuments(query);
    res.status(200).json({
      tasks,
      pagination:{
        totaTasks,
        currentPage:page,
        totalPages:Math.ceil(totaTasks/limit),
        limit,
      }
    })
  } catch (error) {
    console.error("Error fetching Tasks", error.message);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = { createTask, readTasks, updateTasks, deleteTasks , fetchTasks };
