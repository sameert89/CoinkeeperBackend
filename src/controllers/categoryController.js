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
          { $eq: [{ $month: "$date" }, month] },
          { $eq: [{ $year: "$date" }, year] },
        ],
      },
    })
      .exec()
      .lean();
    res.status(200);
    res.send(dbResponse);
  } catch (error) {
    res.status(404);
    console.log(error);
    res.send("Resource Not Found In the Database");
  }
};

module.exports = { getCategoryWiseExpenditure };
