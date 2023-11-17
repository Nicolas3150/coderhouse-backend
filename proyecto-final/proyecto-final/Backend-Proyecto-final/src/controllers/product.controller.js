import * as productService from "../services/product.service.js";

export const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let response = await productService.getAllProducts(category);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.json({ error });
  }
};

export const createProduct = async (req, res) => {
  try {
    const productCreated = await productService.createProduct(req.body);
    res.status(201).json(productCreated);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateOneProduct = async (req, res) => {
  try {
    const productUpdated = await productService.updateOneProduct(
      req.params.id,
      req.body
    );
    res.status(200).json(productUpdated);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteOneProduct = async (req, res) => {
  try {
    const deleted = await productService.deleteOneProduct(req.params.id);
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ error });
  }
};
