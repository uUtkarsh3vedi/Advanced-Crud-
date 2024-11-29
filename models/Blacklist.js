const mongoose = require('mongoose')

const blackListSchema = new mongoose.Schema({
    token:{
        type: String,
        required: true,
        unique: true 
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: "15m"
    }
})

const BlackList =  mongoose.model("Blacklist",blackListSchema);
module.exports = BlackList