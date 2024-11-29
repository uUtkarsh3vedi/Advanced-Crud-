const mongoose = require('mongoose')

const URL = "mongodb://localhost:27017"

const connection = async() => {

    try {
        await mongoose.connect(URL,{
           
        })
        console.log("Database connected Succcesfully ")
    } catch (error) {
        console.log("Error connecting with database ")
        
    }
}
module.exports = connection