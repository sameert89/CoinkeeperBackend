const mongoose = require("mongoose");

const TransactionModel = require("../models/transactionModel");

//Based on Date Range
const getTransactions = async (req, res) => {
  try {
    const { dateStart, dateEnd } = req.query;
    if (!dateStart || !dateEnd) {
      res.status(400).json("Dates are Absent");
      return;
    }
    const dbResponse = await TransactionModel.find({
      date: { $gte: dateStart, $lte: dateEnd },
    }).lean();
    res.status(200).json(dbResponse);
  } catch (error) {
    console.log(error);
    res.status(404).json("Resource Not Found In the Database");
  }
};

const addTransaction = async (req, res) => {
  try {
    const { description, date, amount, category } = req.body;
    console.log(req.body);
    if (!description || !date || !amount || !category) {
      res.status(400).json("Transaction Details are Incomplete");
      return;
    } // Transaction schema is not subject to change hence the CC
    const transaction = new TransactionModel({
      amount: amount,
      category: category,
      date: new Date(date),
      user: req.id, // comes from the auth middleware
      description: description,
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
    const updateResult = await TransactionModel.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    if (!updateResult) {
      res.status(404).json("Transaction not found");
      return;
    }
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
    console.log(deleted);
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
