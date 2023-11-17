import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { clientController } from "../controllers/client.controller.js";

const router = Router();

router.get("/", checkAuth, clientController.getHome);
router.get("/login", clientController.getLogin);
router.get("/register", clientController.getRegister);
router.get("/fail/login", clientController.getFailLogin);
router.get("/fail/register", clientController.getFailRegister);
router.get("/item", checkAuth, clientController.getProduct);
router.get("/cart", checkAuth, clientController.getCart);
router.get("/profile", checkAuth, clientController.getProfile);
router.post("/checkout", checkAuth, clientController.sendMessage);

export default router;
