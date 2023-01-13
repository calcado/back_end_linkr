import { connection } from "../app.js";

export async function editpost(req, res) {

    const { id } = req.params
    const { text } = req.body

    try {
        await connection.query("UPDATE posts SET description=$2 WHERE id = $1;", [id, text])
        res.sendStatus(204);
        return
    } catch (err) {
        res.status(500).send(err.messsage);
    }

}

