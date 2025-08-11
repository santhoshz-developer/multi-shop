import { Router } from "express";
import { body } from "express-validator";
import {
  createShop,
  getShops,
  getShopById,
  getMyShops,
  updateShop,
  deleteShop,
  getShopStorefrontData,
  getShopsByOwner,
} from "../../controllers/Shops/shopController";
import { protect, shopOwner } from "../../middlewares/authMiddleware";
import { validate } from "../../utils/validator";

const router = Router();

router.post(
  "/",
  protect,
  shopOwner,
  [
    body("name").notEmpty().withMessage("Shop name is required"),
    body("category").notEmpty().withMessage("Category is required"),
    body("location").notEmpty().withMessage("Location is required"),
  ],
  validate,
  createShop
);

router.get("/", getShops);
router.get("/storefront/:shopId", getShopStorefrontData);
router.get("/:id", getShopById);
router.get("/owner/:ownerId", getShopsByOwner);
router.get("/my/shops", protect, shopOwner, getMyShops);
router.put("/:id", protect, shopOwner, updateShop);
router.delete("/:id", protect, shopOwner, deleteShop);

export default router;
