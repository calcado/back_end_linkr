import express from "express"
import cors from "cors"
import pg from "pg"
import authRoute from "./routes/authRoutes.js"


const {Pool} = pg

export const connection = new Pool ({
    connectionString:'postgres://sbkpjlpv:v9agjHuEi2t5U4wD_vmowMYe6fS8oEZS@jelani.db.elephantsql.com/sbkpjlpv'
})


const app = express()
app.use(express.json())
app.use(cors())
app.use(authRoute)


app.listen(5000)