const TransactionModel = require("../models/transactionModel");
const { encrypt, decrypt } = require("../utils/helpers");

//Based on Date Range
const getTransactions = async (req, res) => {
  try {
    const { dateStart, dateEnd } = req.query;
    if (!dateStart || !dateEnd) {
      res.status(400).json("Dates are Absent");
      return;
    }
    const dbResponse = await TransactionModel.find({
      user: req.id,
      date: { $gte: dateStart, $lte: dateEnd },
    }).lean();
    // Decrypt the necessary fields
    const transactions = dbResponse.map((transaction) => ({
      ...transaction,
      amount: decrypt(transaction.amount),
      category: decrypt(transaction.category),
      description: transaction.description
        ? decrypt(transaction.description)
        : null,
    }));

    console.log(transactions);
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(404).json("Resource Not Found In the Database");
  }
};

const addTransaction = async (req, res) => {
  try {
    const { description, date, amount, category } = req.body;

    if (!description || !date || !amount || !category) {
      res.status(400).json("Transaction Details are Incomplete");
      return;
    } // Transaction schema is not subject to change hence the CC
    const transaction = new TransactionModel({
      amount: encrypt(amount.toString()),
      category: encrypt(category),
      date: new Date(date),
      user: req.id, // comes from the auth middleware
      description: encrypt(description),
    });
    await transaction.save();
    res.status(201).json("Transaction Added Successfully");
  } catch (error) {
    console.log(error);
    res.status(422).json("Cannot Process Transaction");
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json("Transaction ID absent");
      return;
    }

    const updateData = { ...req.body };
    if (updateData.amount) updateData.amount = encrypt(updateData.amount);
    if (updateData.category) updateData.category = encrypt(updateData.category);
    if (updateData.description)
      updateData.description = encrypt(updateData.description);

    await TransactionModel.findOneAndUpdate({ _id: id }, updateData, {
      new: true,
    }).lean();
    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(400).json("Cannot Update Transaction");
  }
};

const removeTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json("Transaction ID absent");
      return;
    }
    const deleted = await TransactionModel.findOneAndDelete({ _id: id });
    if (!deleted) {
      res.status(404).json("Transaction not found");
      return;
    }
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(400).json("Cannot Update Transaction");
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  updateTransaction,
  removeTransaction,
};
