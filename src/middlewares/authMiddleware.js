import signUpSchema from "../schemas/signUpSchema.js"


export async function signUpValidation (req, res, next) {

    const user = req.body

    try{

        const {error} = signUpSchema.validate(user)
    } catch (err) {
        
    }
     
}