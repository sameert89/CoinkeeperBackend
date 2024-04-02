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
