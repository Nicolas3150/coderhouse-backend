import { Router } from "express";
import { getHome, getUser } from "../controllers/homeController.js";
import { checkAuth } from "../controllers/authController.js";

const home = Router();

home.get("", checkAuth, getHome);
home.get("/user", checkAuth, getUser);

export default home;
