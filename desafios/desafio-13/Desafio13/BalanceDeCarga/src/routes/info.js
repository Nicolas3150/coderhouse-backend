import { Router } from "express";
import { getInfo } from "../controllers/infoController.js";

const info = Router();

info.get("", getInfo);

export default info;
