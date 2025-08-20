const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function GetInfoResponse(prompt, prm) {

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: prm
  });

  const result = await model.generateContent(prompt);
  return result.response.text();
}

module.exports = { GetInfoResponse };
