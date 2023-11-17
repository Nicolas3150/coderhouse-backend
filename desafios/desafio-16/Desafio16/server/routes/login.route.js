import { Router } from "express";
import { loginController } from "../controllers/index.js";
import passport from "passport";

const router = Router();

passport.use("login", loginController.loginStrategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

router.post(
  "/",
  passport.authenticate("login", {
    failureRedirect: "/fail/login",
  }),
  (req, res) => res.redirect("/")
);

export default router;
