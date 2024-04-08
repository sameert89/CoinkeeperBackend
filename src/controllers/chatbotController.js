const OpenAI = require("openai");

const openAIService = new OpenAI({
  apiKey: process.env["OPENAI_KEY"],
});

const {
  systemPrompt,
  generateUserPrompt,
} = require("../configs/chatbot.config");

const interpretVoiceTranscripton = async (req, res) => {
  try {
    const { voiceTranscription } = req.body;
    const completion = await openAIService.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: generateUserPrompt(voiceTranscription) },
      ],
      model: "gpt-3.5-turbo",
    });
    res.json({ interpretedData: completion.choices[0].message.content });
  } catch (error) {
    console.log(error);
    res.status(422).json("Cannot Process Transaction");
  }
};

const provideAnalysis = async (req, res) => {
  try {
    res.status(200).json("Analysis is still under development");
  } catch (error) {
    res.status(404).json("Cannot Find Analysis");
  }
};

module.exports = { interpretVoiceTranscripton, provideAnalysis };
