import Router from "koa-router";
import ProductController from "../controllers/product.controller.js";
import authMiddleware from "../middlewares/jwt.js";

const router = new Router({
  prefix: "/api/productos",
});

router.get("/", authMiddleware, ProductController.getAll);
router.get("/:id", authMiddleware, ProductController.getById);
router.post("/", authMiddleware, ProductController.createOne);
router.put("/:id", authMiddleware, ProductController.updateOne);
router.delete("/:id", authMiddleware, ProductController.deleteOne);

export default router;
