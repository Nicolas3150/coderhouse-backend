import { check, param } from "express-validator";
import { validateResult } from "../utils/validateHelper.js";
import * as chatService from "../services/chat.service.js";
import * as messageDao from "../daos/message.dao.js";

export const validateMessageData = [
  check("message").notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const validateResponseData = [
  check("message").notEmpty(),
  param("id_message").custom(async (value, { req }) => {
    const chat = await chatService.getChat();
    const msj = await chat.messages.find(
      (item) => item.message._id.toString() === value
    );
    if (!msj) throw new Error("No se encontro el mensaje");
    return true;
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
