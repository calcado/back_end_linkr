import { Router } from "express";
import getUser from "../controllers/usersController.js";


const userRoute = Router()

userRoute.get("/user/:id", getUser)

export default userRoute