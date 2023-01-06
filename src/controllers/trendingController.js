import { connection } from "../app.js";

export async function trending(req, res) {
    try {
        const trendingList = await connection.query(
            "SELECT name FROM trending ORDER BY view DESC;"
        );

        res.status(200).send(trendingList.rows);

    } catch (err) {
        
        console.log(err);
        res.status(500).send(err);
    }
}
