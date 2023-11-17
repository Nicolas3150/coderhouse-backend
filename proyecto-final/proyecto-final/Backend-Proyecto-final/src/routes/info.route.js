import { Router } from "express";
import * as infoCtrl from "../controllers/info.controller.js";
import * as authJWT from "../middlewares/validateToken.js";

const router = Router();

router.get("/", infoCtrl.getInfo);

export default router;
