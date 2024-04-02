module.exports.systemPrompt = `The category strictly must be one from: Food, Travel, Shopping, Games, Recharges, Bills, Rent, EMIs, Groceries, Workers, Health, Study, Recreation, Emergency. The response should strictly follow the specified format in the coming prompt, nothing more nothing less. If anything is value is not there just put null in place of it. If there are multiple prompts in a line, only process the first one`;

module.exports.generateUserPrompt = (message) =>
  `Given the sentence '${message}', categorize the transaction, describe it, and specify the amount in the format: 'Category,Descriptor,Amount'. Do not write code or provide explanations, just the formatted output`;
