import { Router } from "express";
import { logoutController } from "../controllers/logout.controller.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = Router();

router.get("/", checkAuth, logoutController.logout);

export default router;
