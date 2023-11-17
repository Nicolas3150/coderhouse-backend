import { Router } from "express";
import {
  getLogin,
  postLogin,
  getFailLogin,
} from "../controllers/loginController.js";
import { Strategy } from "passport-local";
import passport from "passport";
import bcrypt from "bcrypt";
import UserContainer from "../containers/userContainer.js";

const users = new UserContainer();
const login = Router();

function isValidPassword(reqPassword, hashedPassword) {
  return bcrypt.compareSync(reqPassword, hashedPassword);
}

const loginStrategy = new Strategy(async (username, password, done) => {
  const user = await users.getByUsername(username);

  if (!user || !isValidPassword(password, user.password)) {
    return done(null);
  }
  return done(null, user);
});

passport.use("login", loginStrategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser(users.getById);

login.get("", getLogin);
login.post(
  "",
  passport.authenticate("login", {
    failureRedirect: "/login/fail",
  }),
  postLogin
);
login.get("/fail", getFailLogin);

export default login;
