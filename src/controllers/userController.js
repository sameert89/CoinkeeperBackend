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
const getBudget = async(req, res) => {
  try {
    const response = await UserModel.findOne({id: req.id});
    return res.json(response.preferences.budget);
  } catch(error) {
    console.log(error);
    res.status(404).end();
  }
}

const setUserPreferences = async (req, res) => {
  try {
    const { name, email, preferences } = req.body;
    if (!name && !email && !preferences) {
      return res.status(204).end();
    }
    const response = await UserModel.findOneAndUpdate(
      { _id: req.id },
      {
        name: encrypt(name),
        email: encrypt(email),
        preferences: preferences,
      }
    );
    res.status(200).json({
      ...response,
      message: "Profile Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Failed to set user preferences");
  }
};

module.exports = { getUserPreferences, setUserPreferences, getBudget };
