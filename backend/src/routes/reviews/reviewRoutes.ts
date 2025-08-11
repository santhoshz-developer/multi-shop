
import { Router } from 'express';
import { body } from 'express-validator';
import { 
  createReview, 
  getProductReviews, 
  getUserReviews, 
  updateReview, 
  deleteReview 
} from '../../controllers/reviews/reviewController';
import { protect } from '../../middlewares/authMiddleware';
import { validate } from '../../utils/validator';

const router = Router();

router.post(
  '/',
  protect,
  [
    body('product_id').notEmpty().withMessage('Product ID is required'),
    body('order_id').notEmpty().withMessage('Order ID is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
  ],
  validate,
  createReview
);

router.get('/product/:productId', getProductReviews);
router.get('/user/reviews', protect, getUserReviews);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

export default router;