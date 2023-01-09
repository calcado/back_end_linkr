import { connection } from "../app.js"
import userRepository from "../repositories/userRepository.js"


export async function getUserbyId (req, res) {

    const userId = req.params.id

    try {
        const user = await userRepository.getUserById(userId)
        res.status(200).send(user)

    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }

}

export async function getUserByName (req, res) {

    const userName = req.params.userName

    try {
        const users = await userRepository.getUserByName(userName)
        res.status(200).send(users)

    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}