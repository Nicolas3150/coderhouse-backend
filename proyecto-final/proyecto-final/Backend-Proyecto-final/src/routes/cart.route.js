import { Router } from "express";
import * as cartCtrl from "../controllers/cart.controller.js";
import * as authJWT from "../middlewares/validateToken.js";
import * as validate from "../validators/cart.validator.js";

const router = Router();

router.get("/", authJWT.validateToken, cartCtrl.getCart);
router.post(
  "/",
  [authJWT.validateToken, validate.validateProductToAdd],
  cartCtrl.addProductToCart
);
router.delete(
  "/:id_prod",
  [authJWT.validateToken, validate.validateProductToDelete],
  cartCtrl.deleteProductToCart
);

export default router;
