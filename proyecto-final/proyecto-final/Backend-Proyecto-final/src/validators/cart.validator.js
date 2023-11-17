import { check, param } from "express-validator";
import { validateResult } from "../utils/validateHelper.js";
import * as productService from "../services/product.service.js";

export const validateProductToAdd = [
  check("id_prod")
    .notEmpty()
    .custom(async (value, { req }) => {
      const product = await productService.getProductById(value);
      if (!product) throw new Error("Product not found");
      return true;
    }),
  check("quantity")
    .notEmpty()
    .custom((value, { req }) => {
      if (value < 0)
        throw new Error("No puedes ingresar un valor de cantidad menor a 0");
      return true;
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const validateProductToDelete = [
  param("id_prod")
    .notEmpty()
    .custom(async (value, { req }) => {
      const product = await productService.getProductById(value);
      if (!product) throw new Error("Product not found");
      return true;
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
