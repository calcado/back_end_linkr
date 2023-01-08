import express from "express"
import cors from "cors"
import pg from "pg"
import authRoute from "./routes/authRoutes.js"
import timeline_post from "./routes/timeline_post.route.js";
import timeline_get from "./routes/timeline_get.route.js";
import likeRoute from "./routes/likeRoutes.js"
import dotenv from "dotenv"

import timelineRoute from "./routes/timelineRoutes";

dotenv.config();


const { Pool } = pg
export const connection = new Pool({
    /* user: "postgres",
    host: "localhost",
    port: 5432,
    database: "exercicio_mystoreultrasystem_3a28727e",
    password: "root", */
    connectionString: "postgres://sbkpjlpv:v9agjHuEi2t5U4wD_vmowMYe6fS8oEZS@jelani.db.elephantsql.com/sbkpjlpv",
    ssl: false
})


const app = express()

app.use(express.json())
app.use(cors())
app.use(authRoute)

app.use(likeRoute)
app.use(timelineRoute);



app.listen(5000)
