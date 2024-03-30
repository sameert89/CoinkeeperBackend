const express = require("express");

const router = express.Router();

const { rootPath } = require("../utils/constants");

const {
  loginUser,
  registerUser,
  validateSession,
} = require("../controllers/authController");
const { validateToken } = require("../middlewares/authMiddleware");

router.post(rootPath + "auth/register", registerUser);

router.post(rootPath + "auth/login", loginUser);

router.get(rootPath + "auth/session-validate", validateToken, validateSession);
