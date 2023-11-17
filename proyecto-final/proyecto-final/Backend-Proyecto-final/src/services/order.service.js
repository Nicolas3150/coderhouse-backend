import * as orderDao from "../daos/order.dao.js";
import * as userService from "../services/user.service.js";
import * as cartService from "../services/cart.service.js";
import * as emails from "../utils/emails.js";
import CustomError from "../utils/CustomError.js";

export const generateOrder = async (id, address) => {
  const user = await userService.getUserById(id);
  const productsInCart = await cartService.getProductsInCart(user.cart);
  if (!productsInCart.products.length)
    throw new CustomError(400, "No hay productos en el carrito");
  const orderCreated = await orderDao.createOrder({
    products: productsInCart.products,
    address,
    date: new Date(Date.now()),
    number: (await orderDao.getNumberOrders()) + 1,
    state: "Generada",
    user: user._id,
  });
  await cartService.deleteAllProductsInCart(user.cart);
  emails.sendEmailToAdmin(
    `se ha realizado un nuevo pedido con id: \n${orderCreated._id}. Para mas informacion ingrese en ecommerce`,
    "Nueva orden generada con exito."
  );
  emails.sendEmailToClient(user.email, orderCreated);
  return orderCreated;
};

export const getAllOrders = async () => {
  return await orderDao.getAllOrders();
};

export const getUserOrders = async (id) => {
  return await orderDao.getUserOrders(id);
};
