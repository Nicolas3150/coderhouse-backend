import { productService } from "../services/product.service.js";

const getAllProducts = async (req, res) => {
  try {
    const response = await productService.getAllProducts();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

const getProductById = async (req, res) => {
  try {
    const response = await productService.getProductById(req.params.id);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

const createProduct = async (req, res) => {
  try {
    const response = await productService.createProduct(req.body);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    await productService.updateProduct(req.params.id, req.body);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

export const productController = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
