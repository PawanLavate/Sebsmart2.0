import axios from 'axios';
import { generateText } from '../config/ai.js';

const GDD_MODEL_URL =
  process.env.GDD_MODEL_URL || 'http://localhost:5002/run-gdd';

export const timeSeriesGrowth = async (req, res) => {
  try {
    console.log('➡️ Incoming Request Body:', req.body);

    const { variety, soil, daily_weather, accumulated_gdd } = req.body;

    // ---- VALIDATION ----
    if (!variety || !soil || !daily_weather) {
      return res.json({
        success: false,
        message: 'Missing required fields: variety, soil, daily_weather',
      });
    }

    if (!Array.isArray(daily_weather) || daily_weather.length === 0) {
      return res.json({
        success: false,
        message: 'daily_weather must be a non-empty array',
      });
    }

    // ---- FORMAT WEATHER ----
    const formattedWeather = daily_weather.map((w) => ({
      date: w.date,
      tmin: Number(w.tmin),
      tmax: Number(w.tmax),
    }));

    console.log('📡 Sending request to Flask ML model...');
    console.log('Payload:', {
      variety,
      soil,
      accumulated_gdd,
      daily_weather: formattedWeather,
    });

    // ---- CALL PYTHON MODEL ----
    const mlResponse = await axios.post(GDD_MODEL_URL, {
      variety,
      soil,
      accumulated_gdd,
      daily_weather: formattedWeather,
    });

    if (!mlResponse?.data?.state) {
      throw new Error('Invalid response format from Flask model');
    }

    console.log('✅ Flask ML Response:', mlResponse.data);

    const result = mlResponse.data;

    // ---- CLEAN ML RESULT FOR AI ----
    const cleanedResult = {
      stage: result.state.stage,
      cumulative_gdd: result.state.cum_gdd,
      flower_survival: result.state.flower_survival,
      size_factor: result.state.size_factor,
      quality_factor: result.state.quality_factor,
      yield_projection: result.tree_yield,
      gdd_needed_next_stage: result.state.gdd_to_next_stage || null,
    };

    // =====================================================================
    // 🧠 IMPROVED SYSTEM PROMPT
    // =====================================================================

    const systemPrompt = `
    You are an expert apple phenology analyst for North Indian apple belts 
(Himachal Pradesh, J&K, Uttarakhand).

You will PREDICT the apple growth stage yourself using:

• accumulated GDD (total heat units so far)
• today’s cumulative GDD from ML output
• variety-specific GDD thresholds (bud break → bloom → fruit set → fruit growth → harvest)
• soil type (affects speed: sandy = faster, clay = slower)
• daily weather trend (tmax, tmin)

Your goal:
• Correct the ML stage if it is wrong — you decide real stage based on GDD thresholds.
• Predict next stage + how many days left based on remaining GDD.
• Explain if the current weather will accelerate or slow stage development.
• Give 1–3 simple farmer action steps.
• Give yield trend using survival, size factor, quality factor.
• Keep the tone extremely simple, farmer-friendly, and accurate.

RULES:
- GDD is the main driver. Use thresholds for stage calculation.
- If accumulated_gdd > bud break threshold → stage is NOT dormancy.
- Use soil type to adjust speed: Sandy +10%, Clay -10%, Silty +5%, Peaty -5%.
- If GDD to next stage = very small → predict next stage soon.
- NEVER hallucinate numbers that are not provided.
- Use short, clear structured output.


`;

    // =====================================================================
    // 🧠 IMPROVED USER PROMPT
    // =====================================================================

    const userPrompt = `
    Use the following data to calculate the REAL current stage of the apple tree 
and predict the next stages using GDD logic.

DATA INPUT:
{
  "variety": ${variety},
  "soil": ${soil},
  "accumulated_gdd": ${accumulated_gdd},
  "today_gdd": ${result.state.today_gdd},
  "cumulative_gdd": ${result.state.cum_gdd},
  "gdd_stages":  {
    'Red Delicious': {
      chill_target: 1000,
      t_base: 4.0,
      gdd_stages: [
        ('Bud break', 120),
        ('Pre-bloom', 300),
        ('Bloom', 400),
        ('Fruit set', 750),
        ('Fruit growth', 1200),
        ('Harvest', 1500),
      ],
      potential_yield: 20.0,
    },
    'Royal Delicious': {
      chill_target: 1000,
      t_base: 4.0,
      gdd_stages: [
        ('Bud break', 120),
        ('Pre-bloom', 300),
        ('Bloom', 400),
        ('Fruit set', 750),
        ('Fruit growth', 1200),
        ('Harvest', 1500),
      ],
      potential_yield: 20.0,
    },
    'Golden Delicious': {
      chill_target: 1350,
      t_base: 4.0,
      gdd_stages: [
        ('Bud break', 150),
        ('Pre-bloom', 350),
        ('Bloom', 450),
        ('Fruit set', 800),
        ('Fruit growth', 1250),
        ('Harvest', 1500),
      ],
      potential_yield: 25.0,
    },
    Ambri: {
      chill_target: 900,
      t_base: 4.0,
      gdd_stages: [
        ('Bud break', 100),
        ('Pre-bloom', 250),
        ('Bloom', 350),
        ('Fruit set', 700),
        ('Fruit growth', 1200),
        ('Harvest', 1400),
      ],
      potential_yield: 15.0,
    },
    Maharaji: {
      chill_target: 950,
      t_base: 4.0,
      gdd_stages: [
        ('Bud break', 110),
        ('Pre-bloom', 260),
        ('Bloom', 360),
        ('Fruit set', 720),
        ('Fruit growth', 1250),
        ('Harvest', 1450),
      ],
      potential_yield: 18.0,
    },
    "Tydeman's Early": {
      chill_target: 700,
      t_base: 4.0,
      gdd_stages: [
        ('Bud break', 80),
        ('Pre-bloom', 200),
        ('Bloom', 300),
        ('Fruit set', 600),
        ('Fruit growth', 1100),
        ('Harvest', 1300),
      ],
      potential_yield: 18.0,
    },
    Anna: {
      chill_target: 400,
      t_base: 4.0,
      gdd_stages: [
        ('Bud break', 50),
        ('Pre-bloom', 150),
        ('Bloom', 250),
        ('Fruit set', 500),
        ('Fruit growth', 900),
        ('Harvest', 1200),
      ],
      potential_yield: 15.0,
    },
    'Granny Smith': {
      chill_target: 700,
      t_base: 4.0,
      gdd_stages: [
        ('Bud break', 80),
        ('Pre-bloom', 200),
        ('Bloom', 300),
        ('Fruit set', 600),
        ('Fruit growth', 1100),
        ('Harvest', 1300),
      ],
      potential_yield: 20.0,
    },
    Fuji: {
      chill_target: 850,
      t_base: 4.0,
      gdd_stages: [
        ('Bud break', 90),
        ('Pre-bloom', 220),
        ('Bloom', 320),
        ('Fruit set', 650),
        ('Fruit growth', 1150),
        ('Harvest', 1350),
      ],
      potential_yield: 20.0,
    },
    Gala: {
      chill_target: 700,
      t_base: 4.0,
      gdd_stages: [
        ('Bud break', 80),
        ('Pre-bloom', 200),
        ('Bloom', 300),
        ('Fruit set', 600),
        ('Fruit growth', 1100),
        ('Harvest', 1300),
      ],
      potential_yield: 18.0,
    },
  },
}

WHAT TO DO:

Don't mention these lines (Because today_gdd is undefined, there is no weather effect on growth speed) or similar tyoes of lines that show the model in a negative light.

1. **Current Growth Stage (based on cumulative_gdd vs gdd_stages)**  
   - Ignore ML stage if wrong. Use GDD thresholds to determine the real stage.
   - Explain in simple words.


3. **Weather Effect on Growth Speed**  
   - If warm → faster stage completion  
   - If cold → slower  
   - Mention soil effect on speed (+/- %)  
   - Do not mention that you don't have weather data.

4. **Next Stage Prediction**  
   - Calculate GDD needed = next_stage_threshold - cumulative_gdd  
   - Estimate days = GDD_needed / today_gdd (if today_gdd > 0)  
   - Say: “If this weather continues, next stage will come in X–Y days.”

5. **Future Stage Timeline**  
   - Short summary: bloom → fruit set → fruit growth → harvest  
   - Mention how heat/cold affects them.

6. **Farmer Action Steps (1–3)**  
   - Based on current stage, soil, weather.

7. **Yield Trend**  
   - increase / stable / decrease based on inputs.

8. **Prediction Confidence**  
   - Strong / Moderate / Low based on weather stability and GDD clarity.

9. **Do not write any sentence that says that you don't have current data , weather or gdd**

`;

    console.log('🤖 Sending request to Gemini model...');

    const finalText = await generateText({
      systemInstruction: systemPrompt,
      userPrompt,
    });
    console.log('✅ Model Response Prepared');

    return res.json({ success: true, result: finalText });
  } catch (error) {
    console.error('\n❌ ERROR OCCURRED IN GDD TIME SERIES:');
    console.error('Message:', error.message);
    return res.json({ success: false, message: error.message });
  }
};
