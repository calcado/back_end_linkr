import { connection } from "../app.js";
import findHashtags from "find-hashtags";

async function postHashtag(description) {
    const hashtags = findHashtags(description);
    console.log(hashtags)

    try {
        hashtags?.map(async (hashtag) => {
            const hashtagAlreadyExists = await connection.query(
                "SELECT name FROM trending WHERE name= $1",
                [hashtag]
            );

            if (hashtagAlreadyExists.rowCount === 0) {
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

async function findPostsWithHashtag(hashtagId) {

    try {
        const { rows } = await connection.query(
            `SELECT posts.* 
            FROM posts
            JOIN "postTrending" 
                ON posts.id="postTrending"."postId"
            JOIN trending 
                ON trending.id="postTrending"."trendingId"
            WHERE trending.id = $1;`, [hashtagId],
        );
        return rows;

    } catch (err) {
        console.log(err.message);
    }
}

const trendRepository = {
    postHashtag,
    findPostsWithHashtag,
};

export default trendRepository;
