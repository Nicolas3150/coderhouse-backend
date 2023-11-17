import { Router } from "express";
import { registerController } from "../controllers/index.js";
import passport from "passport";
import { upload } from "../utils/storage.js";

const router = Router();

passport.use("register", registerController.signUpStrategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

router.post(
  "/",
  passport.authenticate("register", {
    failureRedirect: "/fail/register",
  }),
  (req, res) => res.redirect("/")
);

router.post("/upload", upload.single("avatar"), (req, res) => {
  res.send(req.file.originalname);
});

export default router;
