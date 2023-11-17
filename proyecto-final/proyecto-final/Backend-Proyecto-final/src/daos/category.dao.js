import { Category } from "../models/category.model.js";
import CustomError from "../utils/CustomError.js";

export const createCategory = async (name) => {
  try {
    return await Category.create({ name });
  } catch (error) {
    throw new CustomError(500, "Error creating category");
  }
};

export const getCategories = async () => {
  try {
    return await Category.find();
  } catch (error) {
    throw new CustomError(500, "Error getting categories");
  }
};

export const deleteOneCategory = async (id) => {
  try {
    return await Category.deleteOne({ _id: id });
  } catch (error) {
    throw new CustomError(500, "Error deleting categories");
  }
};
