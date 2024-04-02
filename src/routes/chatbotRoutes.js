const express = require("express");

const router = express.Router();

const {
  interpretVoiceTranscripton,
  provideAnalysis,
} = require("../controllers/chatbotController");
const { rootPath } = require("../utils/constants");

router.post(rootPath + "chatbot/decode", interpretVoiceTranscripton);
router.get(rootPath + "chatbot/analysis", provideAnalysis);

module.exports = router;
