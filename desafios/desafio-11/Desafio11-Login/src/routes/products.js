import { Router } from "express";
import { getProducts } from "../controllers/productController.js";

const router = Router();

router.get("/productos-test", getProducts);

export default router;
