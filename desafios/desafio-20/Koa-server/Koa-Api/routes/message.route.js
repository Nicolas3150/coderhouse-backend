import Router from "koa-router";
import MessageController from "../controllers/message.controller.js";
import authMiddleware from "../middlewares/jwt.js";

const router = new Router({
  prefix: "/api/mensajes",
});

router.get("/", authMiddleware, MessageController.getAll);

router.post("/", authMiddleware, MessageController.create);

export default router;
