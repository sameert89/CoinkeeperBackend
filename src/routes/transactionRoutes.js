const express = require("express");

const router = express.Router();

const {
  getTransactions,
  addTransaction,
  updateTransaction,
  removeTransaction,
} = require("../controllers/transactionController");

const { rootPath } = require("../utils/constants");

router.get(rootPath + "transactions", getTransactions);
router.post(rootPath + "transactions", addTransaction);
router.patch(rootPath + "transactions/:id", updateTransaction);
router.delete(rootPath + "transactions/:id", removeTransaction);
