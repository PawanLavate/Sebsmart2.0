import axios from 'axios';
import { generateText } from '../config/ai.js';

const YIELD_MODEL_URL =
  process.env.YIELD_MODEL_URL || 'http://localhost:5001/predict';

export const yieldEstimation = async (req, res) => {
  try {
    const {
      District_name,
      species,
      growth_stage,
      soil,
      weather,
      pesticides,
      tree_count,
    } = req.body;

    // Validate input
    if (
      !District_name ||
      !species ||
      !growth_stage ||
      !soil ||
      !weather ||
      !pesticides ||
      !tree_count
    ) {
      return res.json({
        success: false,
        message: 'All fields are required',
      });
    }

    // -------------------------
    // SEND DATA TO YOUR ML MODEL
    // -------------------------

    const mlResponse = await axios.post(YIELD_MODEL_URL, {
      District_name,
      species,
      growth_stage,
      soil,
      weather,
      pesticides,
      tree_count: Number(tree_count),
    });

  

// const result = mlResponse.data;


    // ML model response
    const result = mlResponse.data.prediction;

    // Return response to frontend
    // return res.json({
    //   success: true,
    //   count: result.appleCount,
    //   weight: result.weightPerTree,
    //   totalYield: result.totalYieldKg,
    //   details: result.details,
    // });

    const systemPrompt = `
    You are an expert agricultural advisor specialized in apple orchard yield prediction.

Your job is to convert the ML model’s numerical yield output into a simple, clear, farmer-friendly explanation.

STRICT RULES:
- Use simple, easy language that any farmer can understand (8th grade level).
- Do not add any numbers or facts that are not given by the ML model.
- Never make up diseases, pests, or extra yield factors.
- Only use the inputs provided: district, species, soil, weather, pesticides, and tree count.
- Provide practical guidance, not technical explanations.
- Keep the tone supportive and confidence-building.
- Output must be clean, short, and easy to read.

Your goal:
Explain the predicted apple count, weight, and total yield in a meaningful and helpful way for the farmer.
`;

    const userPrompt = `
    Convert the following apple yield prediction into a simple, farmer-friendly explanation.

Input details:
- District: ${District_name}
- Apple Variety: ${species}
- Growth Stage: ${growth_stage}
- Soil Type: ${soil}
- Weather: ${weather}
- Pesticides Used: ${pesticides}
- Number of Trees: ${tree_count}

ML Model Output:
${result}

Write the explanation using this structure:

1. **Summary of Yield**
   - Total expected yield (kg) (Bold this number)

2. **What This Means for the Farmer**
   - Short interpretive explanation in simple language.

3. **Why This Yield is Expected**
   - Briefly mention soil, weather, stage, or pesticides ONLY if present in input.

4. **Advice for the Farmer**
   - 2–3 practical steps to maintain or improve yield.

5. **Mention the risks**
 


Do NOT add information not included in the ML model or inputs.
Keep it short and helpful.
`;

    const refineResult = await generateText({
      systemInstruction: systemPrompt,
      userPrompt,
    });

    

    return res.json({ success: true, result : refineResult } );
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};
