import { check } from "express-validator";
import { validateResult } from "../utils/validateHelper.js";
import { Category } from "../models/category.model.js";

export const validateProductData = [
  check("title").notEmpty(),
  check("description").notEmpty(),
  check("category")
    .notEmpty()
    .isArray()
    .custom(async (value, { req }) => {
      if (!value) throw new Error("Ingrese al menos una categoria!");
      const categories = (await Category.find()).map(
        (category) => category.name
      );
      for (let i = 0; i < value.length; i++) {
        if (!categories.includes(value[i]))
          throw new Error(`${value[i]} is invalid category!`);
      }
      return true;
    }),
  check("price")
    .notEmpty()
    .isNumeric()
    .custom((value, { req }) => {
      if (value < 0)
        throw new Error("No puedes ingresar un valor de precio menor a $0");
      return true;
    }),
  check("thumbnail").notEmpty().isURL(),
  check("stock")
    .notEmpty()
    .isNumeric()
    .custom((value, { req }) => {
      if (value < 0)
        throw new Error("No puedes ingresar un valor de stock menor a 0");
      return true;
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
