import { connection } from "../app.js";

export async function userLike(req,res){
const postId = req.params
const userId = res.locals.userId

 try{
 await connection.query(`INSERT INTO likes ('userId', 'postId') VALUES ($1,$2);`,[userId,postId])
 res.sendStatus(201)
 }catch(err){console.log(err)}
    
}

export async function userUnlike(req,res){
const userId = res.locals.userId;
const postId = req.params
try{
await connection.query(`DELETE from likes WHERE 'userId'=$1 AND 'postId'=$2;`,[userId,postId])
res.sendStatus(204)
}catch(err){console.log(err)}
}

export async function getLikes(req,res){
    const postId = req.params
    try{
    const numberLikes =  await connection.query(`SELECT COUNT('postId') FROM likes WHERE "postId"=$1;`,[postId])  
    res.send(numberLikes).status(201);
}catch(err){console.log(err)}
}