import { RowDataPacket } from "mysql2";
import { IProduct, IProductCreate, IProductUpdate } from "./types";
import pool from "../../config/database";

class Product {
  static async create(productData: IProductCreate): Promise<IProduct> {
    const [result] = (await pool.query(
      "INSERT INTO products (product_id, shop_id, category_id, name, description, price, discounted_price, stock_quantity, sku, barcode, weight, weight_unit, main_image) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        productData.shop_id,
        productData.category_id,
        productData.name,
        productData.description || null,
        productData.price,
        productData.discounted_price || null,
        productData.stock_quantity,
        productData.sku || null,
        productData.barcode || null,
        productData.weight || null,
        productData.weight_unit || null,
        productData.main_image,
      ]
    )) as RowDataPacket[];

    const [rows] = (await pool.query(
      "SELECT * FROM products WHERE product_id = ?",
      [result.insertId]
    )) as RowDataPacket[];
    return rows[0] as IProduct;
  }

  static async findById(productId: string): Promise<IProduct | null> {
    const [rows] = (await pool.query(
      "SELECT * FROM products WHERE product_id = ?",
      [productId]
    )) as RowDataPacket[];
    return (rows[0] as IProduct) || null;
  }

  static async findByShop(
    shopId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{ products: IProduct[]; total: number }> {
    const offset = (page - 1) * limit;
    const [rows] = (await pool.query(
      "SELECT * FROM products WHERE shop_id = ? AND is_active = TRUE ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [shopId, limit, offset]
    )) as RowDataPacket[];

    const [countResult] = (await pool.query(
      "SELECT COUNT(*) as total FROM products WHERE shop_id = ? AND is_active = TRUE",
      [shopId]
    )) as RowDataPacket[];

    return {
      products: rows as IProduct[],
      total: countResult[0].total,
    };
  }

  static async findByCategory(
    categoryId: string, // Changed from shop_id to categoryId
    page: number = 1,
    limit: number = 10
  ): Promise<{ products: IProduct[]; total: number }> {
    const offset = (page - 1) * limit;
    const [rows] = (await pool.query(
      "SELECT * FROM products WHERE category_id = ? AND is_active = TRUE ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [categoryId, limit, offset]
    )) as RowDataPacket[];

    const [countResult] = (await pool.query(
      "SELECT COUNT(*) as total FROM products WHERE category_id = ? AND is_active = TRUE",
      [categoryId]
    )) as RowDataPacket[];

    return {
      products: rows as IProduct[],
      total: countResult[0].total,
    };
  }

  static async update(
    productId: string,
    productData: IProductUpdate
  ): Promise<IProduct | null> {
    await pool.query(
      "UPDATE products SET category_id = ?, name = ?, description = ?, price = ?, discounted_price = ?, stock_quantity = ?, sku = ?, barcode = ?, weight = ?, weight_unit = ?, main_image = ?, is_active = ? WHERE product_id = ?",
      [
        productData.category_id || null,
        productData.name || null,
        productData.description || null,
        productData.price || null,
        productData.discounted_price || null,
        productData.stock_quantity || null,
        productData.sku || null,
        productData.barcode || null,
        productData.weight || null,
        productData.weight_unit || null,
        productData.main_image || null,
        productData.is_active ?? true,
        productId,
      ]
    );

    return this.findById(productId);
  }

  static async delete(productId: string): Promise<boolean> {
    const [result] = (await pool.query(
      "DELETE FROM products WHERE product_id = ?",
      [productId]
    )) as RowDataPacket[];
    return result.affectedRows > 0;
  }
}

export default Product;
