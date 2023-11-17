import { Strategy } from "passport-local";
import { hashPassword } from "../utils/hashPassword.js";
import UserRepository from "../repository/UserRepository.js";
import logger from "../utils/loggers.js";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userRepository = new UserRepository();

const getSignUp = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.sendFile(path.join(__dirname, "../../public/views/signup.html"));
  }
};

const postSignUp = (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/views/index.html"));
};

const getFailsignup = (req, res) => {
  res.render("signup-error", {});
};

const signUpStrategy = new Strategy(
  { passReqToCallback: true },
  async (req, username, password, done) => {
    const user = await userRepository.getByUsername(username);
    try {
      if (user) {
        return done(null);
      }
      const newUser = {
        username: username,
        password: hashPassword(password),
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        avatar: req.body.avatar,
      };
      const createdUser = await userRepository.create(newUser);

      return done(null, createdUser);
    } catch (err) {
      logger.error(err);
      done(err);
    }
  }
);

const getById = (id, done) => {
  try {
    userRepository.getById(id, done);
  } catch (error) {
    logger.error(error);
  }
};

export const registerController = {
  signUpStrategy,
  getById,
  getSignUp,
  postSignUp,
  getFailsignup,
};
