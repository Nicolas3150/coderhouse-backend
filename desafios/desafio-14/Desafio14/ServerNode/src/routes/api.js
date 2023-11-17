import { Router } from "express";
import { getProducts, forkRandoms } from "../controllers/apiController.js";

const router = Router();

router.get("/productos-test", getProducts);
router.get("/randoms", forkRandoms);

export default router;
