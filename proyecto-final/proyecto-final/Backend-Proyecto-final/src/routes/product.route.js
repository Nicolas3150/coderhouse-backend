import { Router } from "express";
import * as productCtrl from "../controllers/product.controller.js";
import * as authJWT from "../middlewares/validateToken.js";
import { validateProductData } from "../validators/product.validator.js";

const router = Router();

router.get("/", productCtrl.getAllProducts);
router.get("/:id", productCtrl.getProductById);

// router.get("/", authJWT.validateToken, productCtrl.getAllProducts);
// router.get("/:id", authJWT.validateToken, productCtrl.getProductById);
router.post(
  "/",
  [authJWT.validateToken, authJWT.ifAdmin, validateProductData],
  productCtrl.createProduct
);
router.put(
  "/:id",
  [authJWT.validateToken, authJWT.ifAdmin, validateProductData],
  productCtrl.updateOneProduct
);
router.delete(
  "/:id",
  [authJWT.validateToken, authJWT.ifAdmin],
  productCtrl.deleteOneProduct
);

export default router;
