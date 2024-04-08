const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
const { SALT_ROUNDS, COOKIE_SETTINGS } = require("../configs/auth.config");

const { createToken } = require("../middlewares/authMiddleware");
const { encrypt, deterministicHash } = require("../utils/helpers");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const emailHash = deterministicHash(email);

    // Check if the user already exists
    const existingUser = await UserModel.findOne({
      emailHash,
    });

    if (existingUser) {
      const message = "Email already exists! Please log in";
      return res.status(409).json({ message });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // Create new user object
    const newUser = new UserModel({
      name: encrypt(name),
      email: encrypt(email),
      emailHash: emailHash, // Reusing the previous value to save computation
      passwordHash: passwordHash,
    });

    // Save the new user
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User Created Successfully, Please Login!",
    });
  } catch (err) {
    console.error("User Creation Failed with Error: ", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error While Creating User",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailHash = deterministicHash(email);
    const user = await UserModel.findOne({ emailHash });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exist" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (isPasswordValid) {
      const accessToken = createToken(user);
      res.cookie("access_token", accessToken, COOKIE_SETTINGS);
      return res.json({
        message: "Successfully Logged In",
      });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Entered password is incorrect" });
    }
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error, try again after some time",
    });
  }
};

// Silent validation, if Chain of Command reaches this point means user's
// session token is valid
const validateSession = (req, res) => {
  res.status(200).end();
};

module.exports = { loginUser, registerUser, validateSession };
