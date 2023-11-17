import { Router } from "express";
import * as authCtrl from "../controllers/auth.controller.js";
import * as validatorUser from "../validators/user.validator.js";
import { validateAddress } from "../validators/address.validator.js";
import * as authJWT from "../middlewares/validateToken.js";

const router = Router();

router.post(
  "/register",
  [validatorUser.validateUserRegister, validateAddress],
  authCtrl.register
);
router.post("/login", validatorUser.validateUserLogin, authCtrl.login);
router.get("/login", authCtrl.loginRender);
router.get("/refresh", authCtrl.refreshToken);
router.get("/logout", authCtrl.logout);
router.get("/profile", authJWT.validateToken, authCtrl.getUserLogueado);

export default router;
