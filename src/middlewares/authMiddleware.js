import signUpSchema from "../schemas/signUpSchema.js"
import signInSchema from "../schemas/signInSchema.js"
import { connection } from "../app.js"
import userRepository from "../repositories/userRepository.js"
import bcrypt from "bcrypt"


export async function signUpValidation (req, res, next) {

    const user = req.body

    try{

        const alreadyRegistered = await userRepository.checkEmail(user.email)
        const {error} = signUpSchema.validate(user)

        if(alreadyRegistered){
            return res.status(409).send("Usuário já cadastrado")
        }

        if(error) {
            return res.status(422).send("Insira todos os dados corretamente")
        }

        req.user = user
        next()

    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }   
     
}

export async function signInValidation (req, res, next) {

    const user = req.body

    try {

        const {error} = signInSchema.validate(user)
        const checkUser = await userRepository.checkEmail(user.email)

        if (error) {
            return res.status(422).send("Insira os dados corretamente")
        }

        if(!checkUser) {
            return res.status(404).send("Email não cadastrado!")
        }

        const checkPassword = bcrypt.compareSync(user.password, checkUser.password)

        if(!checkPassword) {
            return res.status(401).send("Senha incorreta!")
        }

        req.user = user
        next()

    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}