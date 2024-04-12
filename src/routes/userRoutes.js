const express = require("express");
const router = express.Router();

const { rootPath } = require("../utils/constants");

const {
  setUserPreferences,
  getUserPreferences,
} = require("../controllers/userController");
const { validateToken } = require("../middlewares/authMiddleware");

router.post(rootPath + "preferences", validateToken, setUserPreferences);
router.get(rootPath + "preferences", validateToken, getUserPreferences);

module.exports = router;
