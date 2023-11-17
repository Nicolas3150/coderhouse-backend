import * as productDao from "../daos/product.dao.js";
import { Category } from "../models/category.model.js";

export const getAllProducts = async (category) => {
  const foundCategory = await Category.findOne({ name: { $in: [category] } });
  const products = foundCategory
    ? await productDao.getProductsByCategory(foundCategory._id)
    : await productDao.getAllProducts();
  return products;
};

export const getProductById = async (id) => {
  return await productDao.getProductById(id);
};

export const createProduct = async (productToCreate) => {
  const foundCategories = await Category.find({
    name: { $in: productToCreate.category },
  });
  productToCreate.category = foundCategories.map((category) => category._id);
  return await productDao.createProduct(productToCreate);
};

export const updateOneProduct = async (id, product) => {
  const foundCategories = await Category.find({
    name: { $in: product.category },
  });
  product.category = foundCategories.map((category) => category._id);
  return await productDao.updateOneProduct(id, product);
};

export const deleteOneProduct = async (id) => {
  const productDeleted = await productDao.getProductById(id);
  await productDao.deleteOneProduct(id);
  return productDeleted;
};
