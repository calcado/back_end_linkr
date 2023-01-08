import { Router } from "express";
import { timeline_get, timeline_post } from "../controllers/timelineController.js";
import { tokenValidation } from "../middlewares/authMiddleware.js";

const timelineRoute = Router();

  timelineRoute.get("/timeline",tokenValidation, timeline_get);
  timelineRoute.post("/timeline", tokenValidation, timeline_post);
  
export default timelineRoute;