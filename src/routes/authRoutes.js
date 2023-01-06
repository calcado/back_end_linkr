import { Router } from "express";
import { logout, signIn, signUp } from "../controllers/authController.js";
import { signInValidation, signUpValidation, tokenValidation } from "../middlewares/authMiddleware.js";


const authRoute = Router()


authRoute.post("/signup", signUpValidation, signUp)
authRoute.post("/signin", signInValidation, signIn)
authRoute.delete("/logout/:token", logout)

export default authRoute