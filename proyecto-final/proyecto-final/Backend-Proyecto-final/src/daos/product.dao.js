import { Product } from "../models/product.model.js";
import CustomError from "../utils/CustomError.js";

export const getAllProducts = async () => {
  try {
    return await Product.find();
  } catch (error) {
    throw new CustomError(500, "Error getting products");
  }
};

export const getProductsByCategory = async (category) => {
  try {
    return await Product.find({ category: { $all: [category] } });
  } catch (error) {
    throw new CustomError(500, "Error getting products by category");
  }
};

export const getProductById = async (id) => {
  try {
    return await Product.findById({ _id: id });
  } catch (error) {
    throw new CustomError(404, `Product by id: ${id} not found`);
  }
};

export const createProduct = async (productToCreate) => {
  try {
    return await Product.create(productToCreate);
  } catch (error) {
    throw new CustomError(500, "Error creating product");
  }
};

export const updateOneProduct = async (id, product) => {
  try {
    return await Product.updateOne({ _id: id }, { $set: { ...product } });
  } catch (error) {
    throw new CustomError(404, `Product by id: ${id} not found`);
  }
};

export const deleteOneProduct = async (id) => {
  try {
    return await Product.deleteOne({ _id: id });
  } catch (error) {
    throw new CustomError(404, `Product by id: ${id} not found`);
  }
};
