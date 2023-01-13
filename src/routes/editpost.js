import { Router } from "express";
import {editpost} from "../controllers/editpost.controller.js";

  const router = Router();

  router.patch("/editpost/:id", editpost);

  export default router;    