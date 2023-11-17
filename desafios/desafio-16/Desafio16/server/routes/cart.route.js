import { Router } from "express";
import { cartController } from "../controllers/index.js";

const router = Router();

router.post("/", cartController.createCart);
router.delete("/:id", cartController.deleteCart);
router.get("/:id/productos", cartController.getProductsInCart);
router.post("/:id/productos", cartController.addProductToCart);
router.delete("/:id/productos/:id_prod", cartController.deleteProductInCart);

export default router;
