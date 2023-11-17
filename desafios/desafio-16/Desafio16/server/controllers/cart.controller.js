import { cartService } from "../services/cart.service.js";

const createCart = async (req, res) => {
  try {
    const response = await cartService.createCart();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

const deleteCart = async (req, res) => {
  try {
    await cartService.deleteCart(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

const getProductsInCart = async (req, res) => {
  try {
    const productsInCart = await cartService.getProductsInCart(req.params.id);
    res.json(productsInCart);
  } catch (error) {
    console.log(error);
  }
};

const addProductToCart = async (req, res) => {
  try {
    await cartService.addProductToCart(
      req.params.id,
      req.body.id_prod,
      parseInt(req.body.quantity)
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

const deleteProductInCart = async (req, res) => {
  try {
    await cartService.deleteProductInCart(req.params.id, req.params.id_prod);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

export const cartController = {
  createCart,
  deleteCart,
  getProductsInCart,
  addProductToCart,
  deleteProductInCart,
};
