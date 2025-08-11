import { RowDataPacket } from "mysql2";
import { IOrder, IOrderCreate, IOrderItem } from "./types";
import pool from "../../config/database";

class Order {
  static async create(orderData: IOrderCreate): Promise<IOrder> {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Insert order
      const [orderResult] = (await connection.query(
        "INSERT INTO orders (order_id, user_id, shop_id, order_number, total_amount, discount_amount, tax_amount, shipping_amount, final_amount, payment_method, shipping_address, billing_address, contact_phone, notes) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          orderData.user_id,
          orderData.shop_id,
          orderData.order_number,
          orderData.total_amount,
          orderData.discount_amount || 0,
          orderData.tax_amount || 0,
          orderData.shipping_amount || 0,
          orderData.final_amount,
          orderData.payment_method,
          orderData.shipping_address,
          orderData.billing_address || null,
          orderData.contact_phone,
          orderData.notes || null,
        ]
      )) as RowDataPacket[];

      const orderId = orderResult.insertId;

      // Insert order items
      for (const item of orderData.items) {
        await connection.query(
          "INSERT INTO order_items (order_item_id, order_id, product_id, quantity, unit_price, discount_amount, total_price) VALUES (UUID(), ?, ?, ?, ?, ?, ?)",
          [
            orderId,
            item.product_id,
            item.quantity,
            item.unit_price,
            item.discount_amount || 0,
            item.quantity * (item.unit_price - (item.discount_amount || 0)),
          ]
        );
      }

      await connection.commit();

      const [order] = (await connection.query(
        "SELECT * FROM orders WHERE order_id = ?",
        [orderId]
      )) as RowDataPacket[];
      return order[0] as IOrder;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async findById(orderId: string): Promise<IOrder | null> {
    const [rows] = (await pool.query(
      "SELECT * FROM orders WHERE order_id = ?",
      [orderId]
    )) as RowDataPacket[];
    return (rows[0] as IOrder) || null;
  }

  static async findByUser(
    userId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{ orders: IOrder[]; total: number }> {
    const offset = (page - 1) * limit;
    const [rows] = (await pool.query(
      "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [userId, limit, offset]
    )) as RowDataPacket[];

    const [countResult] = (await pool.query(
      "SELECT COUNT(*) as total FROM orders WHERE user_id = ?",
      [userId]
    )) as RowDataPacket[];

    return {
      orders: rows as IOrder[],
      total: countResult[0].total,
    };
  }

  static async findByShop(
    shopId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{ orders: IOrder[]; total: number }> {
    const offset = (page - 1) * limit;
    const [rows] = (await pool.query(
      "SELECT * FROM orders WHERE shop_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [shopId, limit, offset]
    )) as RowDataPacket[];

    const [countResult] = (await pool.query(
      "SELECT COUNT(*) as total FROM orders WHERE shop_id = ?",
      [shopId]
    )) as RowDataPacket[];

    return {
      orders: rows as IOrder[],
      total: countResult[0].total,
    };
  }

  static async getOrderItems(orderId: string): Promise<IOrderItem[]> {
    const [rows] = (await pool.query(
      "SELECT * FROM order_items WHERE order_id = ?",
      [orderId]
    )) as RowDataPacket[];
    return rows as IOrderItem[];
  }

  static async updateStatus(
    orderId: string,
    status:
      | "pending"
      | "processing"
      | "shipped"
      | "delivered"
      | "cancelled"
      | "returned"
  ): Promise<IOrder | null> {
    await pool.query("UPDATE orders SET order_status = ? WHERE order_id = ?", [
      status,
      orderId,
    ]);
    return this.findById(orderId);
  }

  static async updatePaymentStatus(
    orderId: string,
    status: "pending" | "completed" | "failed" | "refunded"
  ): Promise<IOrder | null> {
    await pool.query(
      "UPDATE orders SET payment_status = ? WHERE order_id = ?",
      [status, orderId]
    );
    return this.findById(orderId);
  }
}

export default Order;
