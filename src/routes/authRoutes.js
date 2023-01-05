import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import { signInValidation, signUpValidation } from "../middlewares/authMiddleware.js";


const authRoute = Router()


authRoute.post("/signup", signUpValidation, signUp)
authRoute.post("/signin", signInValidation, signIn)

export default authRoute