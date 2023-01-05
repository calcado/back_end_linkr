import { connection } from "../app.js";


 async function checkEmail (email) {

    return connection.query("SELECT * FROM users WHERE email = $1", [email])
}

async function registerUser (user) {

        connection.query(`INSERT INTO users (email, password, username, "urlPicture"),
            VALUES ($1, $2, $3, $4)`, [user.email, user.password, user.userName, user.urlPicture])

}

async function createSession (email, token) {

    const {id} = await connection.query(`SELECT * FROM users WHERE email = $1`, [email])

    connection.query(`INSERT INTO sessions ("userId", token) VALUES ($1,$2)`, [id, token])
}

const userRepository = {
    checkEmail, 
    registerUser,
    createSession
}

export default userRepository