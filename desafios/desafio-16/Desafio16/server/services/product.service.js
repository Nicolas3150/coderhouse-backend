import { productDao } from "../daos/product.dao.js";

const getAllProducts = async () => {
  const colection = await productDao.getAllProducts();
  const data = colection.map((item) => ({
    _id: item._doc._id.toString(),
    ...item._doc,
  }));
  return data;
};

const getProductById = async (id) => {
  const item = await productDao.getProductById(id);
  return item;
};

const createProduct = async (product) => {
  const data = await productDao.createProduct({
    timestamp: Date.now().toString(),
    ...product,
  });
  await data.save();
  return data;
};

const updateProduct = async (id, product) => {
  await productDao.updateProduct(id, product);
  return;
};

const deleteProduct = async (id) => {
  await productDao.deleteProduct(id);
  return;
};

export const productService = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
