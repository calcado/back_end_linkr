import userRepository from "../repositories/userRepository.js"


export default async function getUser (req, res) {

    const userId = req.params.id

    try {
        const user = await userRepository.getUserById(userId)
        res.status(200).send(user)

    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }

}