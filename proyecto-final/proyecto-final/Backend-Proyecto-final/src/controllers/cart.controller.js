import * as cartService from "../services/cart.service.js";
import * as userService from "../services/user.service.js";

export const getCart = async (req, res) => {
  try {
    const user = await userService.getUserById(req.uid);
    const cart = await cartService.getProductsInCart(user.cart);
    res.json(cart);
  } catch (error) {
    res.json({ error });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { id_prod, quantity } = req.body;
    const user = await userService.getUserById(req.uid);
    await cartService.addProductToCart(user.cart, id_prod, quantity);
    const cart = await cartService.getProductsInCart(user.cart);
    res.json(cart);
  } catch (error) {
    res.json({ error });
  }
};

export const deleteProductToCart = async (req, res) => {
  try {
    const { id_prod } = req.params;
    const user = await userService.getUserById(req.uid);
    await cartService.deleteProductInCart(user.cart, id_prod);
    const cart = await cartService.getProductsInCart(user.cart);
    res.json(cart);
  } catch (error) {
    res.json({ error });
  }
};
