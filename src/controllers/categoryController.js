const TransactionModel = require("../models/transactionModel");

const getCategoryWiseExpenditure = async (req, res) => {
  try {
    const { month, year } = req.query;
    if (!month || !year) {
      throw "Query Params are Incorrect";
    }
    const dbResponse = await TransactionModel.find({
      $expr: {
        $and: [
          { $eq: [{ $month: "$date" }, parseInt(month, 10)] },
          { $eq: [{ $year: "$date" }, parseInt(year, 10)] },
        ],
      },
    }).lean();
    res.status(200);
    res.send(dbResponse);
  } catch (error) {
    res.status(404);
    console.log(error);
    res.json("Resource Not Found In the Database");
  }
};

module.exports = { getCategoryWiseExpenditure };
