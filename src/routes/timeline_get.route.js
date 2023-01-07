import { Router } from "express";
import {timeline_get} from "../controllers/timeline_get.controller.js";

  const router = Router();

  router.get("/timeline_get", timeline_get);

  export default router;