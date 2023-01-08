import { Router } from "express";
import { deletePost, timeline_get, timeline_post, updatePost } from "../controllers/timelineController.js";
import { tokenValidation } from "../middlewares/authMiddleware.js";

const timelineRoute = Router();

  timelineRoute.get("/timeline",tokenValidation, timeline_get);
  timelineRoute.post("/timeline", tokenValidation, timeline_post);
  timelineRoute.update("/timeline/posts/:id", tokenValidation, updatePost);
  timelineRoute.delete("/timeline/posts/:id", tokenValidation, deletePost);
  
export default timelineRoute;