import { Router } from "express";
import { checkIfAdmin } from "../utils/checkAuth.js";
import ProductController from "../controllers/product.controller.js";

const router = Router();

class ProductRoute {
  constructor() {
    this.controller = new ProductController();
  }

  start() {
    router.get("/", this.controller.getAll);
    router.get("/:id", this.controller.getById);
    router.post("/", checkIfAdmin, this.controller.create);
    router.put("/:id", checkIfAdmin, this.controller.update);
    router.delete("/:id", checkIfAdmin, this.controller.delete);

    return router;
  }
}

export default ProductRoute;
