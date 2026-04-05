import express from 'express';
import { yieldEstimation } from '../controller/yieldContoller.js';

const yieldRouter = express.Router();

// no multer needed
yieldRouter.post('/estimation', yieldEstimation);

export default yieldRouter;
