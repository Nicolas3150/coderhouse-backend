import { Router } from "express";
import { productController } from "../controllers/index.js";
import { checkIfAdmin } from "../utils/checkAuth.js";

const router = Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", checkIfAdmin, productController.createProduct);
router.put("/:id", checkIfAdmin, productController.updateProduct);
router.delete("/:id", checkIfAdmin, productController.deleteProduct);

export default router;
