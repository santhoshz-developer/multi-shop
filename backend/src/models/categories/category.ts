import { RowDataPacket } from "mysql2";
import pool from "../../config/database";
import { ICategory, ICategoryCreate, ICategoryUpdate } from "./type";

class Category {
  static async create(categoryData: ICategoryCreate): Promise<ICategory> {
    const [result] = (await pool.query(
      "INSERT INTO categories (category_id, shop_id, name, description, image, is_active) VALUES (UUID(), ?, ?, ?, ?, TRUE)",
      [
        categoryData.shop_id,
        categoryData.name,
        categoryData.description || null,
        categoryData.image || null,
      ]
    )) as RowDataPacket[];

    const [rows] = (await pool.query(
      "SELECT * FROM categories WHERE category_id = LAST_INSERT_ID()"
    )) as RowDataPacket[];
    return rows[0] as ICategory;
  }

  static async findById(categoryId: string): Promise<ICategory | null> {
    const [rows] = (await pool.query(
      "SELECT * FROM categories WHERE category_id = ?",
      [categoryId]
    )) as RowDataPacket[];
    return (rows[0] as ICategory) || null;
  }

  static async findByShop(
    shopId: string,
    page: number = 1,
    limit: number = 10,
    searchTerm?: string
  ): Promise<{ categories: ICategory[]; total: number }> {
    const offset = (page - 1) * limit;
    let query =
      "SELECT * FROM categories WHERE shop_id = ? AND is_active = TRUE";
    const params: any[] = [shopId];

    if (searchTerm) {
      query += " AND name LIKE ?";
      params.push(`%${searchTerm}%`);
    }

    query += " LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const [rows] = (await pool.query(query, params)) as RowDataPacket[];
    const [countResult] = (await pool.query(
      "SELECT COUNT(*) as total FROM categories WHERE shop_id = ? AND is_active = TRUE" +
        (searchTerm ? " AND name LIKE ?" : ""),
      searchTerm ? [shopId, `%${searchTerm}%`] : [shopId]
    )) as RowDataPacket[];

    return { categories: rows as ICategory[], total: countResult[0].total };
  }

  static async update(
    categoryId: string,
    categoryData: ICategoryUpdate
  ): Promise<ICategory | null> {
    await pool.query(
      "UPDATE categories SET name = COALESCE(?, name), description = COALESCE(?, description), image = COALESCE(?, image), is_active = COALESCE(?, is_active) WHERE category_id = ?",
      [
        categoryData.name,
        categoryData.description,
        categoryData.image,
        categoryData.is_active,
        categoryId,
      ]
    );
    return this.findById(categoryId);
  }

  static async delete(categoryId: string): Promise<boolean> {
    const [result] = (await pool.query(
      "DELETE FROM categories WHERE category_id = ?",
      [categoryId]
    )) as RowDataPacket[];
    return result.affectedRows > 0;
  }
}

export default Category;
