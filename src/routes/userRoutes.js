const express = require("express");
const router = express.Router();

const { rootPath } = require("../utils/constants");

const {
  setUserPreferences,
  getUserPreferences,
} = require("../controllers/userController");

router.post(rootPath + "preferences", setUserPreferences);
router.get(rootPath + "preferences", getUserPreferences);

module.exports = router;
