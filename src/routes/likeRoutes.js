import {Router} from "express";


const route = Router();

route.post("/timeline/postId", userValidation,userLike);
route.delete("/timeline/postId", userValidation, userUnlike);