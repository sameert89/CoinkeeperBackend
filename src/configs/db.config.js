const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONN_STRING);
    console.log("Database Connection Success!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
