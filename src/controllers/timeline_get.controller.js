import { connection } from "../app.js";


export async function timeline_get(req, res) {
   
    try {
        const { rows } = await connection.query("SELECT * FROM posts ORDER BY id desc LIMIT 20 ")
        res.send(rows);
    } catch (err) {
        res.status(500).send(err.messsage);
    }
         
   
}





