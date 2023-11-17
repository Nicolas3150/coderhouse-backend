import { Rol } from "../models/role.model.js";
import { Chat } from "../models/chat.model.js";
import * as userService from "../services/user.service.js";
import config from "../config/config.js";
import logger from "./loggers.js";

const createRoles = async () => {
  try {
    const count = await Rol.count();
    if (count > 0) return;
    const values = await Promise.all([
      new Rol({ name: "user" }).save(),
      new Rol({ name: "admin" }).save(),
    ]);
    logger.info(values);
  } catch (error) {
    logger.error(error);
  }
};

const createChat = async () => {
  try {
    const count = await Chat.count();
    if (count > 0) return;
    await new Chat({ messages: [] }).save();
  } catch (error) {
    logger.error(error);
  }
};

const createAdmin = async () => {
  try {
    const user = await userService.getUserByEmail(config.admin_email);
    if (user) return;
    await userService.createUser({
      username: "admin",
      password: "12345678",
      passwordConfirmation: "12345678",
      email: config.admin_email,
      firstName: "admin",
      lastName: "ecommerce",
      avatar:
        "https://cdn2.iconfinder.com/data/icons/avatars-60/5985/40-School_boy-512.png",
      birthday: "2000-01-01",
      phone: "12345678",
      roles: ["admin"],
      address: {
        country: "Argentina",
        province: "Santa Fe",
        city: "Santa Fe",
        cp: 3000,
        street: "San Martin",
        number: 1700,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

export const initialSetup = async () => {
  await Promise.all([createRoles(), createChat(), createAdmin()]);
};
