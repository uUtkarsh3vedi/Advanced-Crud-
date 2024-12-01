const express = require('express')
const userRoutes = require('../routes/userRoutes')
const taskRoutes = require('../routes/taskRoutes')

const router = express.Router()

router.use("/users",userRoutes)
router.use("/api/task",taskRoutes)

module.exports = router;