const mongoose = require('mongoose')

const refreshTokenScehma = new mongoose.Schema({
    token:{
        type: String,
        required: true ,
        unique: true 
    },
    createdAt:{
        type:Date ,
        dafault: Date.now
    }
})

const RefreshToken = mongoose.model("RefreshToken",refreshTokenScehma)
module.exports = RefreshToken