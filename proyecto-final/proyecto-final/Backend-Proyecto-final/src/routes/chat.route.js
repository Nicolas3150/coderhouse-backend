import { Router } from "express";
import * as chatCtrl from "../controllers/chat.controller.js";
import * as authJWT from "../middlewares/validateToken.js";
import * as messageValidator from "../validators/message.validator.js";

const router = Router();

router.get("/", chatCtrl.getChat);
router.get("/user", authJWT.validateToken, chatCtrl.getMessagesByEmail);
router.post(
  "/",
  [authJWT.validateToken, messageValidator.validateMessageData],
  chatCtrl.sendMessage
);
router.post(
  "/:id_message",
  [authJWT.validateToken, messageValidator.validateResponseData],
  chatCtrl.sendResponse
);
router.delete("/:id_message", authJWT.validateToken, chatCtrl.deleteMessage);
router.delete(
  "/:id_message/:id_response",
  authJWT.validateToken,
  chatCtrl.deleteResponse
);

export default router;
