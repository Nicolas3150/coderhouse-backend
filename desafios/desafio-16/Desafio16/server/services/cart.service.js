import { cartDao } from "../daos/cart.dao.js";
import { productService } from "./product.service.js";

const createCart = async () => {
  const data = await cartDao.createCart({
    timestamp: Date.now().toString(),
    products: [],
  });
  await data.save();
  return data;
};

const deleteCart = async (id) => {
  await cartDao.deleteCart(id);
  return;
};

const getProductsInCart = async (id) => {
  const data = await cartDao.getProductsInCart(id);
  return data[0].products;
};

const addProductToCart = async (id, id_prod, quantity) => {
  const productsInCart = await getProductsInCart(id);
  const isInCart = productsInCart.find(
    (item) => item._id.toString() === id_prod
  );
  if (!isInCart) {
    const product = await productService.getProductById(id_prod);
    if (quantity <= product.stock) {
      product._doc.quantity = quantity;
      await cartDao.updateProductToCart(id, [product, ...productsInCart]);
    }
  } else {
    if (isInCart.quantity + quantity <= isInCart.stock) {
      isInCart.quantity = isInCart.quantity + quantity;
      await cartDao.updateProductToCart(id, productsInCart);
    }
  }
};

const deleteProductInCart = async (id, id_prod) => {
  const productsInCart = await getProductsInCart(id);
  const arrayProd = productsInCart.filter(
    (prod) => prod._id.toString() !== id_prod
  );
  await cartDao.updateProductToCart(id, arrayProd);
};

export const cartService = {
  createCart,
  deleteCart,
  getProductsInCart,
  addProductToCart,
  deleteProductInCart,
};
