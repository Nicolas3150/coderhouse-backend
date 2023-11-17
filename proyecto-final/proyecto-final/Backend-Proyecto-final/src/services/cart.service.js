import * as cartDao from "../daos/cart.dao.js";
// import * as productDao from "../daos/product.dao.js";
import * as productService from "./product.service.js";

export const createCart = async () => {
  return await cartDao.createCart();
};

export const getCartById = async (id) => {
  return await cartDao.getCartById(id);
};

export const getProductsInCart = async (id) => {
  return await cartDao.getProductsInCart(id);
};

export const addProductToCart = async (id, id_prod, quantity) => {
  const cart = await getCartById(id);
  const isInCart = cart.products.find(
    (item) => item._id.toString() === id_prod
  );
  if (!isInCart) {
    const product = await productService.getProductById(id_prod);
    if (quantity <= product.stock) {
      return await cartDao.updateCart(id, [
        { _id: id_prod, quantity: quantity },
        ...cart.products,
      ]);
    }
  } else {
    const product = await productService.getProductById(isInCart._id);
    if (isInCart.quantity + quantity <= product.stock) {
      isInCart.quantity = isInCart.quantity + quantity;
      return await cartDao.updateCart(id, cart.products);
    }
  }
};

export const deleteProductInCart = async (id, id_prod) => {
  const productsInCart = await getCartById(id);
  const arrayProd = await productsInCart.products.filter(
    (prod) => prod._id.toString() !== id_prod
  );
  return await cartDao.updateCart(id, arrayProd);
};

export const deleteAllProductsInCart = async (id) => {
  return await cartDao.updateCart(id, []);
};

export const deleteCart = async (id) => {
  return await cartDao.deleteCart(id);
};
