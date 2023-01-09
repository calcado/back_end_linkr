import express from "express"
import cors from "cors"
import pg from "pg"
import authRoute from "./routes/authRoutes.js"
import timeline_post from "./routes/timeline_post.route.js";
import timeline_get from "./routes/timeline_get.route.js";
import dotenv from "dotenv"
import userRoute from "./routes/usersRoutes.js";
dotenv.config();


const { Pool } = pg
export const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
})


const app = express()

app.use(express.json())
app.use(cors())
app.use(authRoute)
app.use(userRoute)
app.use(timeline_post);
app.use(timeline_get);

app.listen(5000)
