import { Router } from "express";
import {
  getSignUp,
  postSignUp,
  getFailsignup,
} from "../controllers/registerController.js";
import { Strategy } from "passport-local";
import passport from "passport";
import bcrypt from "bcrypt";
import UserContainer from "../containers/userContainer.js";

const users = new UserContainer();
const register = Router();

function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

const signUpStrategy = new Strategy(
  { passReqToCallback: true },
  async (req, username, password, done) => {
    try {
      if (await users.ifExist(username)) {
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
      const createdUser = await users.saveUser(newUser);

      return done(null, createdUser);
    } catch (err) {
      console.log(err);
      done(err);
    }
  }
);
passport.use("register", signUpStrategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(users.getById);

register.get("/", getSignUp);
register.post(
  "/",
  passport.authenticate("register", { failureRedirect: "/register/fail" }),
  postSignUp
);
register.get("/fail", getFailsignup);

export default register;
