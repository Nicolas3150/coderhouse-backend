import { userDao } from "../daos/user.dao.js";
import { cartService } from "./cart.service.js";

const getByUsername = async (username) => {
  const data = await userDao.getByUsername(username);
  return data;
};

const createUser = async (user) => {
  const cart = await cartService.createCart();
  const newUser = await userDao.createUser({
    timestamp: Date.now().toString(),
    id_cart: cart._id.toString(),
    ...user,
  });
  return newUser;
};

const getById = async (id, done) => {
  const user = userDao.getById(id, done);
  return user;
};

export const userService = {
  getByUsername,
  createUser,
  getById,
};
