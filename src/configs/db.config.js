const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONN_STRING);
    console.log("database connection succesful");
  } catch (error) {
    console.log("error");
  }
};


module.exports = connectDB;