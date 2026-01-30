import express from "express";
import { getMe } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

export const authRoute = express.Router();

// This is the endpoint the useProfile hook calls
authRoute.get("/", protect, getMe);