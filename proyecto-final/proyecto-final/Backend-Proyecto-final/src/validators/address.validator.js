import { check } from "express-validator";
import { validateResult } from "../utils/validateHelper.js";

export const validateAddress = [
  check("address").isObject(),
  check("address.country").notEmpty().isString(),
  check("address.province").notEmpty().isString(),
  check("address.city").notEmpty().isString(),
  check("address.cp").notEmpty().isNumeric(),
  check("address.street").notEmpty().isString(),
  check("address.number").notEmpty().isNumeric(),
  check("address.floor").custom((value, { req }) => {
    if (!value) return true;
    if (typeof value === Number) return true;
    throw new Error("Floor is not a number");
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
