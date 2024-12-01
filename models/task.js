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
    status:{
        type:String,
        enum:['pending','in-progress','completed']
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

taskSchema.index({status:1});
taskSchema.index({priority:1});
taskSchema.index({dueDate:1})

const Task =  mongoose.model('Task',taskSchema);

module.exports = Task ;