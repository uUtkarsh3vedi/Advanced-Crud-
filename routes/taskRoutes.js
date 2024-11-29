const express = require("express");
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware')
const checkRole = require('../middlewares/roleMiddleware')
const { createTask, readTasks, updateTasks, deleteTasks } = require('../controller/taskController')

router.post('/create-tasks',authenticate,createTask)
router.post('/read-task',authenticate,readTasks)
router.put('/edit-task',authenticate,updateTasks)
router.delete('/delete-task',authenticate,deleteTasks)

module.exports = router

