import { Router } from "express";
import { checkAuth } from "../controllers/authController.js";
import { getLogout } from "../controllers/logoutController.js";
const logout = Router();

logout.get("/", checkAuth, getLogout);

export default logout;
