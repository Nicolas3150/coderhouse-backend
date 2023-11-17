import { check, param } from "express-validator";
import { validateResult } from "../utils/validateHelper.js";
import { Category } from "../models/category.model.js";

export const validateCategoryData = [
  check("name")
    .notEmpty()
    .custom(async (value, { req }) => {
      const categories = (await Category.find()).map(
        (category) => category.name
      );
      if (categories.includes(value))
        throw new Error("Category already exists!");
      return true;
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const validateCategoryToDelete = [
  param("id").custom(async (value, { req }) => {
    const category = await Category.findById(value);
    if (!category) throw new Error("Category not found!");
    return true;
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
