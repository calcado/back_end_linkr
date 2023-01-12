import { connection } from "../app.js";
import { timeline_post_schema } from "../schemas/timeline_post.schema.js";
import urlMetadata from "url-metadata";
import trendingRepository  from "../repositories/trendingRepository.js";
import trendRepository from "../repositories/trendingRepository.js";

export async function timeline_post(req, res) {
    console.log()
    const push = await connection.query("SELECT * FROM users WHERE id=$1;",[req.userId])
    
    const  user = push.rows[0]
    console.log(user)
    let dados;
    const validation = timeline_post_schema.validate(req.body, {
        abortEarly: false,
    });
    const { url, description } = req.body;

    const corrigido = url.replace("https://", "");
    const corrigido2 = corrigido.replace("http://", "");

    if (validation.error) {
        res.status(422).send(validation.error.message);
        return;
    }

    await urlMetadata("http://" + corrigido2).then(
        function (metadata) {
            dados = metadata;
        },
        function () {
            dados = {
                url: "http://" + corrigido2,
                description: "Não possui,",
                title: "Não possui",
                image: "não possui",
            };
        }
    );

    try {
        const hashtagsId = await trendingRepository.postHashtag(description);

        const {rows} = await connection.query(
            "INSERT INTO posts (userid,url,description,likecount,descricao,titulo,imgurl) VALUES ($1, $2, $3, $4,$5,$6,$7) RETURNING id;",
            [
                req.userId,
                dados.url,
                description,
                0,
                dados.description,
                dados.title,
                dados.image,
            ]
        );
        const postId = rows[0].id;

        trendingRepository.postTrending(postId, hashtagsId);

        res.sendStatus(201);
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message);
    }
    
}

export async function timeline_get(req, res) {

   
    try {
        const { rows } = await connection.query("SELECT posts.id,posts.userid,posts.description,posts.likecount,posts.imgurl,posts.titulo,posts.descricao FROM posts JOIN users ON posts.userid = users.id  ORDER BY users.id desc LIMIT 20 ")
       
        res.send(rows);
    } catch (err) {
        res.status(500).send(err.messsage);
    }
         
   
}

export async function updatePost(req,res){
const postId = req.params
const body = req.body

try{
await connection.query(`UPDATE posts SET description = $1 WHERE postId = $2;`,[body,postId])

}catch(err){
    console.log(err)}    
}

export async function deletePost(req,res){
const postId = req.params
try{
await connection.query(`DELETE posts WHERE id= $1`,[postId])
}catch(err){console.log(err)}

}
