import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { logoutController } from "../controllers/logout.controller.js";
const router = Router();

router.get("/", checkAuth, logoutController.getLogout);

export default router;
