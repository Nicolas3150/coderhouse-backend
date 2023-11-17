import { Strategy } from "passport-local";
import { isValidPassword } from "../utils/hashPassword.js";
import UserRepository from "../repository/UserRepository.js";
import logger from "../utils/loggers.js";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userRepository = new UserRepository();

const getLogin = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.sendFile(path.join(__dirname, "../../public/views/login.html"));
  }
};

const postLogin = (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/views/index.html"));
};

const getFailLogin = (req, res) => {
  res.render("login-error", {});
};

const loginStrategy = new Strategy(async (username, password, done) => {
  const user = await userRepository.getByUsername(username);

  if (!user || !isValidPassword(password, user.password)) {
    return done(null);
  }
  return done(null, user);
});

const getById = (id, done) => {
  try {
    userRepository.getById(id, done);
  } catch (error) {
    logger.error(error);
  }
};

export const loginController = {
  loginStrategy,
  getById,
  getLogin,
  postLogin,
  getFailLogin,
};
