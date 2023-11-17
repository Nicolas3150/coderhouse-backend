import { Router } from "express";
import MessageController from "../controllers/message.controller.js";

const router = Router();

class MessageRoute {
  constructor() {
    this.controller = new MessageController();
  }

  start() {
    router.get("/", this.controller.getAll);
    router.post("/", this.controller.create);

    return router;
  }
}

export default MessageRoute;
