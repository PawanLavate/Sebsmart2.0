import mongoose from "mongoose";

const YieldSchema = new mongoose.Schema(
    {},
    { timestamps: true, minimize: false}
)

const YieldEstimate = mongoose.model('YieldEstimate',YieldSchema)

export default YieldEstimate