import {Router} from "express";
import { getComments } from "../controllers/commentsController.js";
import { tokenValidation } from "../middlewares/authMiddleware.js";

const commentRoute = Router();

commentRoute.get("/timeline/comments",tokenValidation, getComments);
commentRoute.post("/timeline/comments",tokenValidation, )
export default commentRoute;