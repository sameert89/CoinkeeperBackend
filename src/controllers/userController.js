const UserModel = require("../models/userModel");

const getUserPreferences = async (req, res) => {
  try {
    const response = await UserModel.find({ _id: req.id });
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(404).end();
  }
};

const setUserPreferences = async (req, res) => {
  try {
    const { budget, defaultPage } = req.body;
    if (!budget && !defaultPage) {
      return res.status(204).end();
    }
    const response = await UserModel.findOneAndUpdate(
      { _id: req.id },
      { ...(budget && { budget }), ...(defaultPage && { defaultPage }) }
    );
    res.status(200).json("Preferences Updated Successfuly");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Failed to set user preferences");
  }
};

module.exports = { getUserPreferences, setUserPreferences };
