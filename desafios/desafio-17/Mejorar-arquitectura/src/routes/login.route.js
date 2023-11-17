import { Router } from "express";
import { loginController } from "../controllers/index.js";
import passport from "passport";

const router = Router();

passport.use("login", loginController.loginStrategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser(loginController.getById);

router.get("", loginController.getLogin);
router.post(
  "",
  passport.authenticate("login", {
    failureRedirect: "/login/fail",
  }),
  loginController.postLogin
);
router.get("/fail", loginController.getFailLogin);

export default router;
