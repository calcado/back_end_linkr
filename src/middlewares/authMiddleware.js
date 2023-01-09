import signUpSchema from "../schemas/signUpSchema.js"
import signInSchema from "../schemas/signInSchema.js"
import userRepository from "../repositories/userRepository.js"
import bcrypt from "bcrypt"


export async function signUpValidation(req, res, next) {

    const user = req.body

    try {

        const alreadyRegistered = await userRepository.checkEmail(user.email)
        const { error } = signUpSchema.validate(user)

        if (alreadyRegistered) {
            return res.status(409).send("Usuário já cadastrado")
        }

        if (error) {
            return res.status(422).send("Insira todos os dados corretamente")
        }

        req.user = user
        next()

    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }

}

export async function signInValidation(req, res, next) {

    try {

        if(req.headers?.authorization){
            const {authorization} = req.headers
            const token = authorization.replace("Bearer: ", "")
            const user = await userRepository.getUser(token)
            return res.status(200).send(user)
        }

        const user = req.body
        const { error } = signInSchema.validate(user)
        const checkUser = await userRepository.checkEmail(user.email)

        if (error) {
            return res.status(422).send("Insira os dados corretamente")
        }

        if (!checkUser) {
            return res.status(404).send("Email não cadastrado!")
        }

        const checkPassword = bcrypt.compareSync(user.password, checkUser.password)

        if (!checkPassword) {
            return res.status(401).send("Senha incorreta!")
        }

        req.user = user
        next()

    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export async function tokenValidation (req, res, next) {

    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")

    try {
        if (!token) {
            return res.status(401).send("Token não enviado!")
        }

        const user = await userRepository.getUser(token)

        if(!user){
            return res.status(401).send("Token inválido!")
        }

        req.userId = user.userId
        next()

    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
