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
    res.status(201).json({ msg: "Task created successfully", task });
  } catch (error) {
    console.error("Create Task Error:", error.message);
    res.status(500).json({ msg: "Server error" });
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
    res.status(500).json({ msg: "Server Error " });
  }
};

const updateTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const task = await Task.findByIdAndUpdate(id, updates, { new: true });
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }
    res.status(200).json({ msg: "Task updated successfully", task });
  } catch (error) {
    console.error("Update task erorr ", error.message);
    res.status(500).json({ msg: "Server Error " });
  }
};

const deleteTasks = async (req, res) => {
  try {
    const { id } = req.body;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(400).json({ msg: "Task Not found" });
    }
    res.status(200).json({ msg: "Task deleted successfull" });
  } catch (error) {
    console.error("Delete Task Error", error.message);
    res.status(500).json({ msg: "Server Error " });
  }
};

module.exports = {createTask,readTasks,updateTasks,deleteTasks}
