import { Router } from "express";
import * as orderService from "../controllers/order.controller.js";
import * as authJWT from "../middlewares/validateToken.js";

const router = Router();

router.get("/", authJWT.validateToken, orderService.getUserOrders);
router.get(
  "/all",
  [authJWT.validateToken, authJWT.ifAdmin],
  orderService.getOrders
);

export default router;
