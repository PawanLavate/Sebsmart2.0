import mongoose from "mongoose";

const PestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    predictedDisease: {
      type: String, 
    },
    confidence: {
      type: Number, 
    },
    severity: {
      type: String,
      enum: ["Low", "Moderate", "Severe"],
    },
    recommendation: {
      type: String, 
    },
    pesticides: [
      {
        name: { type: String }, 
        dosage: { type: String }, 
        applicationMethod: { type: String }, 
        precautions: { type: String }, 
      },
    ]
  },
  { timestamps: true, minimize: false }
);

const PestControl = mongoose.model("PestControl", PestSchema);

export default PestControl;
