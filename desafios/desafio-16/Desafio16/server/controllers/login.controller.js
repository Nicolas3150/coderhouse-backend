import { Strategy } from "passport-local";
import { userService } from "../services/user.service.js";
import { isValidPassword } from "../utils/hashPassword.js";

const loginStrategy = new Strategy(async (username, password, done) => {
  const user = await userService.getByUsername(username);

  if (!user || !isValidPassword(password, user.password)) {
    return done(null);
  }
  return done(null, user);
});

const getById = (id) => {
  const user = userService.getById(id);
  return user;
};

export const loginController = {
  loginStrategy,
  getById,
};
