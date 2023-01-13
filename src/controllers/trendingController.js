import { connection } from "../app.js";
import trendRepository from "../repositories/trendingRepository.js";


export async function trending(req, res) {
    try {
        const { rows } = await connection.query(
            "SELECT name FROM trending ORDER BY view DESC LIMIT 10;"
        );

        res.status(200).send(rows);

    } catch (err) {

        console.log(err);
        res.status(500).send(err);
    }
}

export async function trendingPosts(req, res) {
    const hashtagId = req.hashtagId;
    
    try {
        const posts = await trendRepository.findPostsWithHashtag(hashtagId); 
        
        trendRepository.incrementView(hashtagId)

        res.status(200).send(posts)

    } catch (err) {

        console.log(err);
        res.status(500).send(err);
    }
}