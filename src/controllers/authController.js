import { connection } from "../app.js";
import userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"



export async function signUp (req, res) {

    const user = req.user
    user.password = bcrypt.hashSync(user.password, 10)

    try {

        await userRepository.registerUser(user)
        res.status(201).send("Usuário cadastrado!")

    } catch (err) {
        res.status(500).send(err)
        console.log(err)
    }
}

export async function signIn (req, res) {

    const {email} = req.user
    const token = uuid()

    try {

        await userRepository.createSession(email, token)
        const {id, name, urlPicture} = await userRepository.checkEmail(email)

        res.status(201).send({userId: id, email:email, userName:name, urlPicture:urlPicture, token:token})
        
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export async function logout (req, res) {

    const {token} = req.params
    try{
       await userRepository.deleteSession(token) 
       res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
    
}