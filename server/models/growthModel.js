import mongoose from "mongoose";


const GrowthSchema = new mongoose.Schema(
    {},
    {timestamps:true, minimize:false}
)


const GrowthTracker = mongoose.model("GrowthSchema",GrowthSchema)

export default GrowthTracker;