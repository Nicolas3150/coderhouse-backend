import { Router } from "express";
import jwt from "../utils/jwt.js";
import ProductRoute from "./product.route.js";
import UserRoute from "./user.route.js";
import MessageRoute from "./message.route.js";
// import InfoRoute from "./info.route.js";

const router = Router();

const productRouter = new ProductRoute();
const userRouter = new UserRoute();
const messageRouter = new MessageRoute();
// const infoRoute = new InfoRoute();

router.use("/", userRouter.start());
router.use("/api/productos", jwt.authMiddleware, productRouter.start());
router.use("/api/mensajes", jwt.authMiddleware, messageRouter.start());
// router.use("/info", jwt.authMiddleware, infoRoute.start());

export default router;
