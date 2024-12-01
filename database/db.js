const mongoose = require("mongoose");
require("dotenv").config();
const connection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {});
    console.log("Database connected Succcesfully ");
  } catch (error) {
    console.log("Error connecting with database ");
  }
};
module.exports = connection;
