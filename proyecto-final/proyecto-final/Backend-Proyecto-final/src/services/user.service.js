import * as userDao from "../daos/user.dao.js";
import * as cartService from "../services/cart.service.js";
import { hashPassword } from "../utils/hashPassword.js";
import * as rolDao from "../daos/rol.dao.js";
import * as addressDao from "../daos/address.daos.js";
import * as emails from "../utils/emails.js";

export const createUser = async (newUser) => {
  const userToAdd = {
    username: newUser.username,
    email: newUser.email,
    password: hashPassword(newUser.password),
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    avatar: newUser.avatar,
    birthday: new Date(newUser.birthday),
    phone: newUser.phone,
  };
  const addressCreated = await addressDao.createAddress(newUser.address);
  if (addressCreated) userToAdd.address = addressCreated._id;

  const roles = await rolDao.addRole(newUser.roles);
  if (roles) userToAdd.roles = roles;

  const cartCreated = await cartService.createCart();
  if (cartCreated) userToAdd.cart = cartCreated._id;

  const userCreated = await userDao.createUser(userToAdd);
  emails.sendEmailToAdmin(
    `Nuevo usuario registrado:\n${userCreated}`,
    "Nuevo registro"
  );
  return userCreated;
};

export const getUserById = async (id) => {
  return await userDao.getUserById(id);
};

export const getUserByEmail = async (email) => {
  return await userDao.getUserByEmail(email);
};

export const getUserByUsername = async (username) => {
  return await userDao.getUserByUsername(username);
};

export const updateUser = async (id, user) => {
  return await userDao.updateUser(id, user);
};
