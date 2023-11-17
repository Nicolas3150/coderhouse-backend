import Router from "koa-router";
import UserController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/jwt.js";

const router = new Router({
  prefix: "/auth",
});

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/:id", authMiddleware, UserController.getUser);

export default router;
