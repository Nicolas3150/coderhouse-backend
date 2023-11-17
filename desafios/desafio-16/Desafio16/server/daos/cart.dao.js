import { Cart } from "../models/cart.model.js";

const createCart = async (cartToCreate) => {
  const createdCart = await Cart.create(cartToCreate);
  return createdCart;
};

const deleteCart = async (id) => {
  await Cart.deleteOne({ _id: id });
  return;
};

const getProductsInCart = async (id) => {
  const productsInCart = await Cart.find({ _id: id }, { _id: 0, products: 1 });
  return productsInCart;
};

const updateProductToCart = async (id, arrayProd) => {
  await Cart.updateOne({ _id: id }, { $set: { products: arrayProd } });
  return;
};

export const cartDao = {
  createCart,
  deleteCart,
  getProductsInCart,
  updateProductToCart,
};
