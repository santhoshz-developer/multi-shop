import { Request, Response } from "express";
import Order from "../../models/orders/order";
import Product from "../../models/products/product";
import Shop from "../../models/shops/shop";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const shop = await Shop.findById(orderData.shop_id);
    if (!shop) {
      return res.status(404).json({
        status: 404,
        message: "Shop not found",
        data: null,
      });
    }

    let totalAmount = 0;
    for (const item of orderData.items) {
      const product = await Product.findById(item.product_id);
      if (!product) {
        return res.status(404).json({
          status: 404,
          message: `Product ${item.product_id} not found`,
          data: null,
        });
      }

      if (product.shop_id !== orderData.shop_id) {
        return res.status(400).json({
          status: 400,
          message: `Product ${product.name} doesn't belong to this shop`,
          data: null,
        });
      }

      if (product.stock_quantity < item.quantity) {
        return res.status(400).json({
          status: 400,
          message: `Not enough stock for ${product.name}`,
          data: null,
        });
      }

      totalAmount += item.quantity * item.unit_price;
    }

    const orderNumber = `ORD-${Date.now()}`;
    const finalAmount =
      totalAmount -
      (orderData.discount_amount || 0) +
      (orderData.shipping_amount || 0) +
      (orderData.tax_amount || 0);

    const order = await Order.create({
      ...orderData,
      user_id: req.user.id,
      order_number: orderNumber,
      total_amount: totalAmount,
      final_amount: finalAmount,
    });

    res.status(201).json({
      status: 201,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error creating order",
      data: null,
    });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        status: 404,
        message: "Order not found",
        data: null,
      });
    }

    if (order.user_id !== req.user.id && !req.user.isAdmin) {
      const shop = await Shop.findById(order.shop_id);
      if (!shop || shop.owner_id !== req.user.id) {
        return res.status(403).json({
          status: 403,
          message: "Not authorized to view this order",
          data: null,
        });
      }
    }

    const items = await Order.getOrderItems(order.order_id);
    res.status(200).json({
      status: 200,
      message: "Order retrieved successfully",
      data: { ...order, items },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error retrieving order",
      data: null,
    });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    // Assuming Order.findByUser returns { orders, total }
    const { orders, total } = await Order.findByUser(
      req.user.id,
      Number(page),
      Number(limit)
    );
    const totalPages = Math.ceil(total / Number(limit));

    res.status(200).json({
      status: 200,
      message: "Orders retrieved successfully",
      data: orders,
      pagination: {
        totalCount: total,
        page: Number(page),
        limit: Number(limit),
        totalPages,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error retrieving orders",
      data: null,
      pagination: null,
    });
  }
};

export const getShopOrders = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const shop = await Shop.findById(req.params.shopId);
    if (!shop) {
      return res.status(404).json({
        status: 404,
        message: "Shop not found",
        data: null,
      });
    }

    if (shop.owner_id !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({
        status: 403,
        message: "Not authorized to view orders for this shop",
        data: null,
      });
    }

    const { orders, total } = await Order.findByShop(
      req.params.shopId,
      Number(page),
      Number(limit)
    );
    const totalPages = Math.ceil(total / Number(limit));

    res.status(200).json({
      status: 200,
      message: "Orders retrieved successfully",
      data: orders,
      pagination: {
        totalCount: total,
        page: Number(page),
        limit: Number(limit),
        totalPages,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error retrieving orders",
      data: null,
      pagination: null,
    });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        status: 404,
        message: "Order not found",
        data: null,
      });
    }

    const shop = await Shop.findById(order.shop_id);
    if (!shop) {
      return res.status(404).json({
        status: 404,
        message: "Shop not found",
        data: null,
      });
    }

    if (shop.owner_id !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({
        status: 403,
        message: "Not authorized to update this order",
        data: null,
      });
    }

    const updatedOrder = await Order.updateStatus(
      req.params.id,
      req.body.status
    );
    res.status(200).json({
      status: 200,
      message: "Order status updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error updating order status",
      data: null,
    });
  }
};

export const updatePaymentStatus = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        status: 404,
        message: "Order not found",
        data: null,
      });
    }

    if (order.user_id !== req.user.id && !req.user.isAdmin) {
      const shop = await Shop.findById(order.shop_id);
      if (!shop || shop.owner_id !== req.user.id) {
        return res.status(403).json({
          status: 403,
          message: "Not authorized to update this order",
          data: null,
        });
      }
    }

    const updatedOrder = await Order.updatePaymentStatus(
      req.params.id,
      req.body.status
    );
    res.status(200).json({
      status: 200,
      message: "Payment status updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error updating payment status",
      data: null,
    });
  }
};
