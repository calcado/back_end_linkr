import { connection } from "../app.js";
import { timeline_post_schema } from "../schemas/timeline_post.schema.js";

export async function timeline_post(req, res) {

    const validation = timeline_post_schema.validate(req.body, { abortEarly: false });
    const {user,url,text} = req.body

try {
        await connection.query("INSERT INTO posts (userId,url,description,likeCount) VALUES ($1, $2, $3);", [user, url, text,0]);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
    
}