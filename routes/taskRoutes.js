const express = require("express");
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware')
const checkRole = require('../middlewares/roleMiddleware')
const { createTask, readTasks, updateTasks, deleteTasks, fetchTasks } = require('../controller/taskController')

router.post('/',authenticate,createTask)
router.get('/read',authenticate,readTasks)
router.get('/',authenticate,fetchTasks)
router.put('/',authenticate,updateTasks)
router.delete('/',authenticate,deleteTasks)

module.exports = router

