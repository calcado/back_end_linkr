import {Router} from "express";
import { userLike,userUnlike } from "../controllers/likeController.js";
import { tokenValidation } from "../middlewares/authMiddleware.js";

const likeRoute = Router();

likeRoute.post("/timeline/postId", tokenValidation,userLike);
likeRoute.delete("/timeline/postId", tokenValidation, userUnlike);

export default likeRoute