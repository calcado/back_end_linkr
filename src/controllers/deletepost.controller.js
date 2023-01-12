import { connection } from "../app.js";

export async function deletepost(req, res) {
    const { id } = req.headers
    
    try {
      await connection.query("DELETE FROM posts WHERE id=$1", [id]);
      res.sendStatus(200);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }