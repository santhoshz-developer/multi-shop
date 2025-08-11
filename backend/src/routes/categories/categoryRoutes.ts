import { Router } from "express";
import { body } from "express-validator";
import {
  createCategory,
  getCategoriesByShop,
  updateCategory,
  deleteCategory,
} from "../../controllers/caregories/caregoriesController";
import { protect, shopOwner } from "../../middlewares/authMiddleware";
import { validate } from "../../utils/validator";

const router = Router();

router.post(
  "/",
  protect,
  shopOwner,
  [
    body("shop_id").notEmpty().withMessage("Shop ID is required"),
    body("name").notEmpty().withMessage("Category name is required"),
  ],
  validate,
  createCategory
);

router.get("/shop/:shopId", getCategoriesByShop);
router.put("/:id", protect, shopOwner, updateCategory);
router.delete("/:id", protect, shopOwner, deleteCategory);

export default router;
