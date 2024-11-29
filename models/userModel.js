const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type:String,
        enum:['Admin','Manager','User'],
        default:'User'
    },

 
},

{timestamps: true})
const User = mongoose.model('userModel',userSchema)
module.exports = User