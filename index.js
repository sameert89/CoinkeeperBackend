
require("dotenv").config();

// Express Server Setup
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cookies = require("cookie-parser");
app.use(cookies());

// Cors Setup
const cors = require("cors");
app.use(
  cors({
    origin: "https://coinkeeper.vercel.app",
    credentials: true,
  })
);

// Database Setup
const connectDB = require("./src/configs/db.config");
connectDB();

app.get("/", function (req, res) {
  res.json("Hello World");
});

const port = process.env.PORT || 3000;

app.listen(process.env.PORT || 3000, () => {
  console.log(`server started on port ${port}`);
});

const authRoutes = require("./src/routes/authRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const chatbotRoutes = require("./src/routes/chatbotRoutes");
const transactionRoutes = require("./src/routes/transactionRoutes");
const userRoutes = require("./src/routes/userRoutes");

app.use("", authRoutes);
app.use("", categoryRoutes);
app.use("", chatbotRoutes);
app.use("", transactionRoutes);
app.use("", userRoutes);
