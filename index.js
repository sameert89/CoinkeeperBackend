require("dotenv").config();

// Express Server Setup
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Database Setup
const connectDB = require("./src/configs/db.config");
connectDB();

app.get("/", function (req, res) {
  res.send("Hello World");
});

const port = process.env.PORT || 3000;

app.listen(process.env.PORT || 3000, () => {
  console.log(`server started on port ${port}`);
});
