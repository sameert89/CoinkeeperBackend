const express = require("express");
const router = express.Router();

const { rootPath } = require("../utils/constants");

const {
  setUserPreferences,
  getUserPreferences,
  getBudget,
} = require("../controllers/userController");
const { validateToken } = require("../middlewares/authMiddleware");

router.post(rootPath + "preferences", validateToken, setUserPreferences);
router.get(rootPath + "preferences", validateToken, getUserPreferences);
router.get(rootPath + "budget", validateToken, getBudget);

module.exports = router;
