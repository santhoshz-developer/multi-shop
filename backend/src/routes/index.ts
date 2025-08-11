import { Router } from "express";
import authRoutes from "../routes/auth/authRoutes";
import shopRoutes from "./../routes/shops/shopRoutes";
import categoryRoutes from "./../routes/categories/categoryRoutes";
import productRoutes from "./../routes/products/productRoutes";
import orderRoutes from "./../routes/orders/orderRoutes";
import reviewRoutes from "./../routes/reviews/reviewRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/shops", shopRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
router.use("/reviews", reviewRoutes);

export default router;
