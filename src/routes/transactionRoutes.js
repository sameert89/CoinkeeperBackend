const express = require("express");

const router = express.Router();

const {
  getTransactions,
  addTransaction,
  updateTransaction,
  removeTransaction,
} = require("../controllers/transactionController");

const { rootPath } = require("../utils/constants");
const { validateToken } = require("../middlewares/authMiddleware");

router.get(rootPath + "transactions", validateToken, getTransactions);
router.post(rootPath + "transactions", validateToken, addTransaction);
router.patch(rootPath + "transactions/:id", validateToken, updateTransaction);
router.delete(rootPath + "transactions/:id", validateToken, removeTransaction);

module.exports = router;
