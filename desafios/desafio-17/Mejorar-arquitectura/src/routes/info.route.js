import { Router } from "express";
import { infoController } from "../controllers/index.js";

const router = Router();

router.get("/", infoController.getInfo);

export default router;
