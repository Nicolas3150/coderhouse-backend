import { Router } from "express";
import { registerController } from "../controllers/index.js";
import passport from "passport";

const router = Router();

passport.use("register", registerController.signUpStrategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(registerController.getById);

router.get("/", registerController.getSignUp);
router.post(
  "/",
  passport.authenticate("register", { failureRedirect: "/register/fail" }),
  registerController.postSignUp
);
router.get("/fail", registerController.getFailsignup);

export default router;
