import { Router } from "express";
import productRouter from "./product.route.js";
import cartRouter from "./cart.route.js";
import registerRouter from "./register.route.js";
import loginRouter from "./login.route.js";
import logoutRouter from "./logout.route.js";
import clientRouter from "./client.route.js";
import userRouter from "./user.route.js";

const router = Router();

router.use("/api/productos", productRouter);
router.use("/api/carrito", cartRouter);
router.use("/api/register", registerRouter);
router.use("/api/login", loginRouter);
router.use("/api/user", userRouter);
router.use("/logout", logoutRouter);
router.use("/", clientRouter);

export default router;
