import { connection } from "../app.js";


 async function checkEmail (email) {

    const user = await connection.query(`SELECT * FROM users WHERE "email" = $1`, [email])
    return user.rows[0]
}

async function registerUser (user) {

     await connection.query(`INSERT INTO users (name, email, password, "urlpicture")
        VALUES ($1, $2, $3, $4)`, [user.name, user.email, user.password, user.urlPicture])

}

async function createSession (email, token) {

    const {id} = (await connection.query(`SELECT * FROM users WHERE "email" = $1`, [email])).rows[0]
    connection.query(`INSERT INTO sessions ("userId", token) VALUES ($1,$2)`, [id, token])
}

async function deleteSession (token) {

    await connection.query(`DELETE FROM sessions WHERE "token" = $1`, [token])
}

async function getUser (token) {

    const user = await connection.query(`SELECT sessions."userId" AS "userId", users."urlpicture" AS "urlPicture" FROM sessions 
        JOIN "users" ON sessions."userId" = users.id WHERE "token" =$1`,[token])
    return(user.rows[0])

}

async function getUserById (userId) {

    return (await connection.query(`SELECT users.name AS "userName", users."urlpicture" AS "urlPicture",
        (SELECT json_agg (post) FROM (SELECT posts.url AS url, posts.description AS description, posts."likecount" AS "likeCount",
        posts.descricao, posts.titulo, posts.imgurl
        FROM posts WHERE "userid" = $1 ) post) AS "posts"
        FROM users WHERE id = $1`, [userId])).rows[0]
}

async function getUserByName (userName) {

    return (await connection.query(`SELECT users.id, users.name, users.urlpicture FROM users WHERE name ILIKE $1`, [(`%${userName}%`)])).rows
}

const userRepository = {
    checkEmail, 
    registerUser,
    createSession,
    deleteSession,
    getUser,
    getUserById,
    getUserByName
}

export default userRepository