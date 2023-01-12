import { Router } from "express";
import { deletepost} from "../controllers/deletepost.controller.js";

const timelineRoute = Router();

   timelineRoute.delete("/timeline/posts", deletepost);
  
export default timelineRoute;