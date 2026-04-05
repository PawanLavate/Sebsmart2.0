import express from "express"
import { timeSeriesGrowth } from "../controller/growthController.js";

const growthRouter = express.Router()


growthRouter.post('/gdd',timeSeriesGrowth)


export default  growthRouter;