import express from "express"
import cors from "cors"
import pg from "pg"
import authRoute from "./routes/authRoutes.js"
import timeline_post from "./routes/timeline_post.route.js";
import timeline_get from "./routes/timeline_get.route.js";
import dotenv from "dotenv"
import trendingRouter from "./routes/trendingRoutes.js"
dotenv.config();


const { Pool } = pg
export const connection = new Pool({
    connectionString: "postgres://sbkpjlpv:v9agjHuEi2t5U4wD_vmowMYe6fS8oEZS@jelani.db.elephantsql.com/sbkpjlpv",
    ssl: false
})


const app = express()

app.use(express.json())
app.use(cors())
app.use(authRoute)

app.use(timeline_post);
app.use(trendingRouter);
app.use(timeline_get);

app.listen(5000)
