import express from "express";
import { upload } from "../config/multer.js";
import { detectPest } from "../controller/pestController.js";

const pestRouter = express.Router();

pestRouter.post("/detectpest", upload.single("image"), detectPest);

export default pestRouter;
