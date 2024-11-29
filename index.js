const express = require('express');
const userRoutes= require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes')
const app = express();
const mongoose = require('mongoose')
const connection = require('./database/db')
const PORT = 8000;

app.use(express.json())
app.use("/user",userRoutes)
app.use("/tasks",taskRoutes)

connection()

app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
});
