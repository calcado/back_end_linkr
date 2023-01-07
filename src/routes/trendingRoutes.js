import { Router } from "express";
import { trending } from "../controllers/trendingController.js";
import { signInValidation } from "../middlewares/authMiddleware.js";
import { trendingValidation } from "../middlewares/trendingMiddleware.js";


const trendingRoute = Router()


trendingRoute.get("/trending", signInValidation, trending)
trendingRoute.get("/trending", signInValidation, trendingValidation, trending)

export default trendingRoute