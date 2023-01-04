import express from "express"
import cors from "cors"
import pg from "pg"




const { Pool } = pg
export const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
})

const app = express()
app.use(express.json())
app.use(cors())


app.listen(5000)