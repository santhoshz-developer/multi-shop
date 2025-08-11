
import { Router } from 'express';
import { body } from 'express-validator';
import { 
  createProduct, 
  getProductsByShop, 
  getProductsByCategory, 
  getProductById, 
  updateProduct, 
  deleteProduct 
} from '../../controllers/products/productController';
import { protect, shopOwner } from '../../middlewares/authMiddleware';
import { validate } from '../../utils/validator';

const router = Router();

router.post(
  '/',
  protect,
  shopOwner,
  [
    body('shop_id').notEmpty().withMessage('Shop ID is required'),
    body('category_id').notEmpty().withMessage('Category ID is required'),
    body('name').notEmpty().withMessage('Product name is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
    body('stock_quantity').isInt({ gt: -1 }).withMessage('Stock quantity must be 0 or more'),
    body('main_image').notEmpty().withMessage('Main image is required')
  ],
  validate,
  createProduct
);

router.get('/shops/:shopId', getProductsByShop);
router.get('/category/:categoryId', getProductsByCategory);
router.get('/:id', getProductById);
router.put('/:id', protect, shopOwner, updateProduct);
router.delete('/:id', protect, shopOwner, deleteProduct);

export default router;