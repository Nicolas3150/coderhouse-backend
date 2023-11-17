import { check } from "express-validator";
import { validateResult } from "../utils/validateHelper.js";
import * as userService from "../services/user.service.js";
import { ROLES } from "../models/role.model.js";
import { isValidPassword } from "../utils/hashPassword.js";

export const validateUserRegister = [
  check("username")
    .notEmpty()
    .custom(async (value, { req }) => {
      if (await userService.getUserByUsername(value))
        throw new Error("User already exists with username");
      return true;
    }),
  check("email")
    .notEmpty()
    .isEmail()
    .custom(async (value, { req }) => {
      if (await userService.getUserByEmail(value))
        throw new Error("User already exists with email");
      return true;
    }),
  check("password").notEmpty().trim().isLength({ min: 8, max: 32 }),
  check("passwordConfirmation")
    .notEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error("Password confirmation does not match password");
      return true;
    }),
  check("firstName").notEmpty(),
  check("lastName").notEmpty(),
  check("avatar").notEmpty().isURL(),
  check("birthday")
    .notEmpty()
    .isDate()
    .withMessage("Intenta ingresar la fecha AAAA-MM-DD"),
  check("roles").custom((value, { req }) => {
    if (!value) return true;
    for (let i = 0; i < value.length; i++) {
      if (!ROLES.includes(value[i])) throw new Error("Invalid Rol!");
    }
    return true;
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const validateUserLogin = [
  check("email")
    .notEmpty()
    .isEmail()
    .custom(async (value, { req }) => {
      const user = await userService.getUserByEmail(value);
      if (!user || !isValidPassword(req.body.password, user.password)) {
        throw new Error("Invalid Credentials!");
      }
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
