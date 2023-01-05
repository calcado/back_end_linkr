import { connection } from "../app.js";
import userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"



export async function signUp () {

    const user = req.user
    user.password = bcrypt.hashSync(user.password, 10)

    try {

        await userRepository.registerUser(user)
        res.status(201).send("Usuário cadastrados!")

    } catch (err) {
        res.status(500).send(err)
        console.log(err)
    }
}

export async function signIn () {

    const {email} = req.user
    const token = uuid()

    try {

        await userRepository.createSession(email, token)

        res.status(201).send(token)
        
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}