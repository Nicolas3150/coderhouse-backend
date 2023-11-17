import { Router } from "express";
import { checkIfAdmin } from "../utils/checkAuth.js";
import ProductRepository from "../repository/ProductRepository.js";

const productRepository = new ProductRepository();
const router = Router();

router.get("/", productRepository.getAll);
router.get("/:id", productRepository.getById);
router.post("/", checkIfAdmin, productRepository.create);
router.put("/:id", checkIfAdmin, productRepository.update);
router.delete("/:id", checkIfAdmin, productRepository.delete);

export default router;
