const express = require("express");

const router = express.Router();

import {
  interpretVoiceTranscripton,
  provideAnalysis,
} from "../controllers/chatbotController";
const { rootPath } = require("../utils/constants");

router.post(rootPath + "chatbot/decode", interpretVoiceTranscripton);
router.get(rootPath, "chatbot/analysis", provideAnalysis);
