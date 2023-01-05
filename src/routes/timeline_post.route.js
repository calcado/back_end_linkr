import { Router } from "express";
import {timeline_post} from "../controllers/timeline_post.controller.js";

  const router = Router();

  router.post("/timeline_post", timeline_post);

  export default router;