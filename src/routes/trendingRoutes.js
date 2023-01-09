import { Router } from "express";
import { connection } from "../app.js";
import { trending, trendingPosts } from "../controllers/trendingController.js";


const trendingRoute = Router()


trendingRoute.get("/trending", trending)
trendingRoute.get("/hashtag/:hashtag", trendingPosts)
//TESTE PARA PEGAR AS HASHTAGS
trendingRoute.get("/hashtags", async (req,res) => {
     const hashtags = await connection.query("SELECT * FROM trending;")
     res.status(200).send(hashtags.rows)
})

export default trendingRoute;