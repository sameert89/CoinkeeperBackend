const mongoose = require("mongoose");
const { EnumPages } = require("../utils/constants");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  preferences: {
    type: mongoose.Schema.Types.Mixed,
    default: {
      budget: 0,
      defaultPage: EnumPages.DASHBOARD,
    },
  },
  customCategories: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("User", userSchema);