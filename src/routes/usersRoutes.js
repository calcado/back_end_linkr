import { Router } from "express";
import {getUserbyId, getUserByName} from "../controllers/usersController.js";


const userRoute = Router()

userRoute.get("/user/:id", getUserbyId)
userRoute.get("/username/:userName", getUserByName)

export default userRoute