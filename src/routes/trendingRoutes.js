import { Router } from "express";
import { trending, trendingPosts } from "../controllers/trendingController.js";
import { trendingValidation } from "../middlewares/trendingMiddleware.js";


const trendingRoute = Router()


trendingRoute.get("/trending", trending)
trendingRoute.get("/hashtag/:hashtag", trendingValidation, trendingPosts)

export default trendingRoute;