import { Router } from "express";
import * as orderService from "../controllers/order.controller.js";
import * as authJWT from "../middlewares/validateToken.js";
import { validateAddress } from "../validators/address.validator.js";

const router = Router();

router.post(
  "/",
  [authJWT.validateToken, validateAddress],
  orderService.generateOrder
);

export default router;
