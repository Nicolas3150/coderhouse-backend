import { Router } from "express";
import { UserController } from "../controllers/index.js";

const router = Router();

class UserRoute {
  constructor() {
    this.controller = new UserController();
  }

  start() {
    router.post("/register", this.controller.register);
    router.post("/login", this.controller.login);
    // router.get("/logout", this.controller.logout);
    router.get("/:id", this.controller.getUser);

    return router;
  }
}

export default UserRoute;
