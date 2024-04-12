const UserModel = require("../models/userModel");
const { encrypt, decrypt } = require("../utils/helpers");

const getUserPreferences = async (req, res) => {
  try {
    const response = await UserModel.findOne({ _id: req.id });
    const user = {
      name: decrypt(response.name),
      email: decrypt(response.email),
      preferences: response.preferences,
    };
    return res.status(200).json(user);
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
