import {Router} from "express";
import { getLikes, userLike,userUnlike } from "../controllers/likeController.js";
import { tokenValidation } from "../middlewares/authMiddleware.js";

const likeRoute = Router();

likeRoute.post("/timeline/likes", tokenValidation, userLike);
likeRoute.delete("/timeline/likes/:id", tokenValidation, userUnlike);
likeRoute.get("/timeline/likes/:id", tokenValidation, getLikes );
export default likeRoute