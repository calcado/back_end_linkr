import express from "express"
import cors from "cors"
import pg from "pg"
import timeline_post from "./routes/timeline_post.route.js";
import dotenv from "dotenv"
import trendingRouter from "./routes/trendingRoutes.js"
dotenv.config();


const { Pool } = pg
export const connection = new Pool({
    connectionString: "postgres://postgres:root@localhost:5432/linkr",
    ssl: false
})

const app = express()

app.use(express.json())
app.use(cors())

app.use(timeline_post);
app.use(trendingRouter);

app.listen(5000)
