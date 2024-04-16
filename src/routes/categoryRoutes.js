const express = require("express");
const router = express.Router();
const {
  getCategoryWiseExpenditure,
} = require("../controllers/categoryController");

const { validateToken } = require("../middlewares/authMiddleware");

const { rootPath } = require("../utils/constants");

router.get(
  rootPath + "categorywise-expenditure",
  validateToken,
  getCategoryWiseExpenditure
);

module.exports = router;
