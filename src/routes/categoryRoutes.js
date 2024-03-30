const express = require("express");
const router = express.Router();
const {
  getCategoryWiseExpenditure,
} = require("../controllers/categoryController");

const { rootPath } = require("../utils/constants");

router.get(rootPath + "categorywise-expenditure", getCategoryWiseExpenditure);
