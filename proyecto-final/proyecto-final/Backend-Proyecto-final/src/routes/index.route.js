import { Router } from "express";
import productRoute from "./product.route.js";
import authRoute from "./auth.route.js";
import categoryRoute from "./category.route.js";
import cartRoute from "./cart.route.js";
import checkoutRoute from "./checkout.route.js";
import orderRoute from "./order.route.js";
import chatRoute from "./chat.route.js";
import infoRoute from "./info.route.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/products", productRoute);
router.use("/category", categoryRoute);
router.use("/cart", cartRoute);
router.use("/checkout", checkoutRoute);
router.use("/order", orderRoute);
router.use("/chat", chatRoute);
router.use("/info", infoRoute);

export default router;
