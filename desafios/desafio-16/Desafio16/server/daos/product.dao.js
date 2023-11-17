import { Product } from "../models/product.model.js";

const getAllProducts = async () => {
  const productCollection = await Product.find();
  return productCollection;
};

const getProductById = async (id) => {
  const product = await Product.findById({ _id: id });
  return product;
};

const createProduct = async (productToCreate) => {
  const createdProduct = await Product.create(productToCreate);
  return createdProduct;
};

const updateProduct = async (id, product) => {
  await Product.updateOne({ _id: id }, { $set: { ...product } });
  return;
};

const deleteProduct = async (id) => {
  await Product.deleteOne({ _id: id });
  return;
};

export const productDao = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
