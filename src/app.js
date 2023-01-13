import express from "express"
import cors from "cors"
import pg from "pg"
import dotenv from "dotenv"
import userRoute from "./routes/usersRoutes.js";
import trendingRoute from "./routes/trendingRoutes.js";
import timelineRoute from "./routes/timelineRoutes.js";
import authRoute from "./routes/authRoutes.js"
import likeRoute from "./routes/likeRoutes.js"
import deletepost from "./routes/deletepost.js"
import commentRoute from "./routes/commentsRoutes.js";
import editpost from "./routes/editpost.js"
dotenv.config();


const { Pool } = pg
export const connection = new Pool({

    connectionString: 'postgres://postgres:root@localhost:5432/linkr',
    ssl: false

})


const app = express()

app.use(express.json());
app.use(cors());
app.use(authRoute);
app.use(userRoute);
app.use(trendingRoute);
app.use(likeRoute);
app.use(timelineRoute);
app.use(deletepost);
app.use(commentRoute);
app.use(editpost)

app.listen(5000);
