const { GoogleGenAI } = require("@google/genai");

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function wolfReply(userMessage) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: `You are The Wolf, a logical financial analyst.\n\nUser question: ${userMessage}` }],
      },
    ],
  });

  return result.response.text();
}

module.exports = wolfReply;
