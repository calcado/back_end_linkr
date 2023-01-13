import { connection } from "../app.js";
import findHashtags from "find-hashtags"

async function postHashtag(description) {
    const hashtags = findHashtags(description);
    const hashtagsId = [];

    try {
        hashtags?.map(async (hashtag) => {
            const hashtagAlreadyExists = await connection.query(
                "SELECT name FROM trending WHERE name= $1;",
                [hashtag]
            );

            if (hashtagAlreadyExists.rowCount === 0) {

                const { rows } = await connection.query(
                    "INSERT INTO trending (name, view) VALUES ($1, $2) RETURNING id;",
                    [hashtag, 0]
                );

                hashtagsId.push(rows[0].id)
            }
        });

        return hashtagsId;

    } catch (err) {
        console.log(err.message);
    }
}

async function findPostsWithHashtag(hashtagId) {

    try {
        const { rows } = await connection.query(
            `SELECT posts.* 
            FROM posts
            JOIN posttrending 
                ON posts.id=posttrending.postid
            JOIN trending 
                ON trending.id=posttrending.trendingid
            WHERE trending.id = $1;`, [hashtagId],
        );
        return rows;

    } catch (err) {
        console.log(err.message);
    }
}

async function postTrending(postId, hashtagsId) {
    
    try {
        hashtagsId.map(async hashtagId => {
            await connection.query(`INSERT INTO posttrending (postid, trendingid) VALUES ($1, $2);`, [postId, hashtagId])
        })

    } catch (err) {
        console.log(err.message);
    }
}

async function findHashtag(hashtag) {
    try{
        const { rows } = await connection.query("SELECT * FROM trending WHERE name = $1;", [hashtag]);
        
        return rows[0];

    } catch(err) {
        console.log(err.message)
    }
}

async function incrementView(id) {
    try {
        await connection.query("UPDATE trending SET view = view + 1 WHERE id = $1 AND view = view;",[id])

    } catch(err) {
        console.log(err.message)
    }
}

const trendRepository = {
    postHashtag,
    findHashtag,
    incrementView,
    findPostsWithHashtag,
    postTrending
};

export default trendRepository;
