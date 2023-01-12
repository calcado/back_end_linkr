import { connection } from "../app.js";


export async function getComments(req,res){
const {id} = req.headers

try{
const comments = await connection.query(`SELECT * FROM comments WHERE postId = $1;`,[id])
res.send(comments).status(200)
}catch(err){
console.log(err)
res.sendStatus(500)
}


}

export async function postComments(req,res){
 const {userId} = req.headers
 const {postId} = req.params
 const {text} = req.body
try{
await connection.query(`INSERT INTO comments (text,'postId','userId') VALUES ($1,$2,$3);`[text,postId,userId]);
res.sendStatus(201);
   
}catch(err){console.log(err)
res.sendStatus(500);
}    

}