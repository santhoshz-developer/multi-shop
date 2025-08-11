
import { Router } from 'express';
import { body } from 'express-validator';
import { 
  createOrder, 
  getOrderById, 
  getUserOrders, 
  getShopOrders, 
  updateOrderStatus, 
  updatePaymentStatus 
} from '../../controllers/orders/orderController';
import { protect, shopOwner } from '../../middlewares/authMiddleware';
import { validate } from '../../utils/validator';

const router = Router();

router.post(
  '/',
  protect,
  [
    body('shop_id').notEmpty().withMessage('Shop ID is required'),
    body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
    body('shipping_address').notEmpty().withMessage('Shipping address is required'),
    body('contact_phone').notEmpty().withMessage('Contact phone is required'),
    body('payment_method').notEmpty().withMessage('Payment method is required')
  ],
  validate,
  createOrder
);

router.get('/:id', protect, getOrderById);
router.get('/user/orders', protect, getUserOrders);
router.get('/shop/:shopId/orders', protect, shopOwner, getShopOrders);
router.put('/:id/status', protect, shopOwner, updateOrderStatus);
router.put('/:id/payment', protect, updatePaymentStatus);

export default router;