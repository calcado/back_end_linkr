import { connection } from "../app.js";
import findHashtags from "find-hashtags";

export async function postHashtag(description) {
    const hashtags = findHashtags(description);

    try {
        hashtags?.map(async (hashtag) => {
            const hashtagAlreadyExists = await connection.query("SELECT name FROM trending WHERE name= $1", [hashtag])
            
            if(hashtagAlreadyExists.rowCount === 0){
                await connection.query(
                    "INSERT INTO trending (name, view) VALUES ($1, $2)",
                    [hashtag, 0]
                );
            } 
        });
    } catch (err) {
        console.log(err.message);
    }
}
