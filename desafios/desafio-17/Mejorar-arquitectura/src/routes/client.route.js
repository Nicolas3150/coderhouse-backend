import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { clientController } from "../controllers/index.js";

const router = Router();

router.get("/", checkAuth, clientController.getHome);
router.get("/api/randoms", checkAuth, clientController.forkRandoms);
router.get("/user", checkAuth, clientController.getUser);

export default router;
