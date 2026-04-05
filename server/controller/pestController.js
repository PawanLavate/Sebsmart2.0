import axios from "axios";
import path from "path";
import { generateText } from "../config/ai.js";
import fs from "fs";
import FormData from "form-data";   

const PEST_MODEL_URL =
  process.env.PEST_MODEL_URL || "http://127.0.0.1:5000/pests";

export const detectPest = async (req, res) => {
  try {
    const { location, cropStage } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const imagePath = path.join("uploads", imageFile.filename);
    const absoluteImagePath = path.resolve(imagePath);

    // ML model endpoint
    // ---- SEND MULTIPART FORM DATA TO FLASK ----
    const formData = new FormData();                       
    formData.append("file", fs.createReadStream(absoluteImagePath));

    const mlResponseRaw = await axios.post(PEST_MODEL_URL, formData, {
      headers: {
        ...formData.getHeaders(),                           
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    const mlResponse = mlResponseRaw.data;

    const systemPrompt = `
    You are an expert agricultural pest management advisor specializing in apple orchards.
    `;

    const userPrompt = `
    Below is the pest detection result:

${JSON.stringify(mlResponse, null, 2)}

Farmer details:
- Location: ${location}
- Apple Crop Stage: ${cropStage}
    `;

    const refineResult = await generateText({
      systemInstruction: systemPrompt,
      userPrompt,
    });

    return res.status(200).json({ success: true, result: refineResult });
  } catch (error) {
    console.error("Pest Detection Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during pest detection",
      error: error.message,
    });
  }
};
