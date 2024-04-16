const TransactionModel = require("../models/transactionModel");
const UserModel = require("../models/userModel");
const { decrypt } = require("../utils/helpers");

const getCategoryWiseExpenditure = async (req, res) => {
  try {
    const { month, year } = req.query;
    if (!month || !year) {
      throw "Query Params are Incorrect";
    }
    const dbResponse = await TransactionModel.find({
      $expr: {
        $and: [
          { user: req.id },
          { $eq: [{ $month: "$date" }, parseInt(month, 10)] },
          { $eq: [{ $year: "$date" }, parseInt(year, 10)] },
        ],
      },
    }).lean();
    const transactions = dbResponse.map((transaction) => ({
      ...transaction,
      amount: decrypt(transaction.amount) * 1,
      category: decrypt(transaction.category),
      description: transaction.description
        ? decrypt(transaction.description)
        : null,
    }));
    const userData = await UserModel.findOne({
      _id: req.id
    });
    // console.log(userData);
    res.status(200).json({
      transactions,
      budget: userData.preferences.budget || 0
    });
  } catch (error) {
    res.status(404);
    console.log(error);
    res.json("Resource Not Found In the Database");
  }
};

module.exports = { getCategoryWiseExpenditure };
