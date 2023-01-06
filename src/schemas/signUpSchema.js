import joi from "joi"


const signUpSchema = joi.object({
    name:joi.string().min(3).max(12).required(),
    email:joi.string().email().required(),
    password:joi.string().required(),
    urlPicture:joi.string()
})

export default signUpSchema