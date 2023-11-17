import { Router } from "express";
import * as categoryCtrl from "../controllers/category.controller.js";
import * as authJWT from "../middlewares/validateToken.js";
import * as validateCategory from "../validators/category.validator.js";

const router = Router();

router.post(
  "/",
  [
    authJWT.validateToken,
    authJWT.ifAdmin,
    validateCategory.validateCategoryData,
  ],
  categoryCtrl.createCategory
);
router.get("/", categoryCtrl.getCategories);
router.delete(
  "/:id",
  [
    authJWT.validateToken,
    authJWT.ifAdmin,
    validateCategory.validateCategoryToDelete,
  ],
  categoryCtrl.deleteOneCategory
);

export default router;
