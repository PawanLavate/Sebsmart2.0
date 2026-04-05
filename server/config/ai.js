import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serverRoot = path.resolve(__dirname, "..");
const envPath = path.join(serverRoot, ".env");

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath, override: false });
}

const readEnv = (...keys) => {
  for (const key of keys) {
    const value = process.env[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return undefined;
};

const apiKey = readEnv("GEMINI_API_KEY");

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY. Set it in server/.env.");
}

export const AI_MODEL = readEnv("GEMINI_MODEL") || "gemini-2.5-flash";

const ai = new GoogleGenAI({
  apiKey,
});

export const generateText = async ({ systemInstruction, userPrompt }) => {
  const response = await ai.models.generateContent({
    model: AI_MODEL,
    config: systemInstruction
      ? { systemInstruction }
      : undefined,
    contents: userPrompt,
  });

  return response.text;
};

export default ai;
