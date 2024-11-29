const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,

    },
    description:{
        type:String,
        required: true
    },
    dueDate:{
        type:Date,
        required: true 
    },
    priority:{
        type:String,
        enum:['Pendiong','In Progress', 'Completed'],
        default: 'Pending'

    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',

    } 

},{timestamps:true})

const Task =  mongoose.model('Task',taskSchema);

module.exports = Task ;