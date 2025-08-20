import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai"

async function GetInfoResponse(prompt, prm) {

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: prm
  });

  const result = await model.generateContent(prompt);
  return result.response.text();
}
export default { GetInfoResponse }; 
