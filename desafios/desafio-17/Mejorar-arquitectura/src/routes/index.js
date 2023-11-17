import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import productRouter from "./product.route.js";
import clientRouter from "./client.route.js";
import registerRoute from "./register.route.js";
import loginRoute from "./login.route.js";
import logoutRoute from "./logout.route.js";
import infoRoute from "./info.route.js";

const router = Router();

router.use("/api/productos", checkAuth, productRouter);
router.use("/register", registerRoute);
router.use("/login", loginRoute);
router.use("/logout", logoutRoute);
router.use("/info", infoRoute);
router.use("/", clientRouter);

export default router;
