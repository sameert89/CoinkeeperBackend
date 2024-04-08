const mongoose = require("mongoose");
const { EnumPages } = require("../utils/constants");

const userSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  email: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, "Email is required"],
  },
  // For User Lookups
  emailHash: {
    type: String,
    required: [true, "Email hash is linked to Email which is required"]
  },
  passwordHash: {
    type: String,
    require: [true, "Password Hash is Required"],
  },
  preferences: {
    type: mongoose.Schema.Types.Mixed,
    default: {
      budget: 50000,
      defaultPage: EnumPages.DASHBOARD,
    },
  },
  customCategories: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("User", userSchema);
