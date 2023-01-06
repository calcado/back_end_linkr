import { Router } from "express";
import { trending } from "../controllers/trendingController.js";
import { signInValidation } from "../middlewares/authMiddleware.js";


const trendingRoute = Router()


trendingRoute.get("/signup", signInValidation, trending)

export default trendingRoute