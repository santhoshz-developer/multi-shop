import { RowDataPacket } from "mysql2";
import pool from "../../config/database";
import { IShop, IShopCreate, IShopUpdate } from "./types";

class Shop {
  static async create(shopData: IShopCreate): Promise<IShop> {
    const [result] = (await pool.query(
      "INSERT INTO shops (shop_id, owner_id, name, description, category, location, address, city, state, country, postal_code, latitude, longitude, contact_email, contact_phone, logo_image, banner_image, is_active) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, TRUE)",
      [
        shopData.owner_id,
        shopData.name,
        shopData.description || null,
        shopData.category,
        shopData.location,
        shopData.address || null,
        shopData.city || null,
        shopData.state || null,
        shopData.country || "India",
        shopData.postal_code || null,
        shopData.latitude || null,
        shopData.longitude || null,
        shopData.contact_email || null,
        shopData.contact_phone || null,
        shopData.logo_image || null,
        shopData.banner_image || null,
      ]
    )) as RowDataPacket[];

    const [rows] = (await pool.query("SELECT * FROM shops WHERE shop_id = LAST_INSERT_ID()")) as RowDataPacket[];
    return rows[0] as IShop;
  }

  static async findById(shopId: string): Promise<IShop | null> {
    const [rows] = (await pool.query("SELECT * FROM shops WHERE shop_id = ?", [shopId])) as RowDataPacket[];
    return (rows[0] as IShop) || null;
  }

  static async findByOwner(ownerId: string, page: number = 1, limit: number = 10, searchTerm?: string): Promise<{ shops: IShop[], total: number }> {
    const offset = (page - 1) * limit;
    let query = "SELECT * FROM shops WHERE owner_id = ? AND is_active = TRUE";
    const params: any[] = [ownerId];

    if (searchTerm) {
      query += " AND name LIKE ?";
      params.push(`%${searchTerm}%`);
    }

    query += " LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const [rows] = (await pool.query(query, params)) as RowDataPacket[];
    const [countResult] = (await pool.query("SELECT COUNT(*) as total FROM shops WHERE owner_id = ? AND is_active = TRUE" + (searchTerm ? " AND name LIKE ?" : ""), searchTerm ? [ownerId, `%${searchTerm}%`] : [ownerId])) as RowDataPacket[];

    return { shops: rows as IShop[], total: countResult[0].total };
  }

  static async findAll(page: number = 1, limit: number = 10, searchTerm?: string): Promise<{ shops: IShop[], total: number }> {
    const offset = (page - 1) * limit;
    let query = "SELECT * FROM shops WHERE is_active = TRUE";
    const params: any[] = [];

    if (searchTerm) {
      query += " AND name LIKE ?";
      params.push(`%${searchTerm}%`);
    }

    query += " LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const [rows] = (await pool.query(query, params)) as RowDataPacket[];
    const [countResult] = (await pool.query("SELECT COUNT(*) as total FROM shops WHERE is_active = TRUE" + (searchTerm ? " AND name LIKE ?" : ""), searchTerm ? [`%${searchTerm}%`] : [])) as RowDataPacket[];

    return { shops: rows as IShop[], total: countResult[0].total };
  }

  static async update(shopId: string, shopData: IShopUpdate): Promise<IShop | null> {
    await pool.query(
      "UPDATE shops SET name = COALESCE(?, name), description = COALESCE(?, description), category = COALESCE(?, category), location = COALESCE(?, location), address = COALESCE(?, address), city = COALESCE(?, city), state = COALESCE(?, state), country = COALESCE(?, country), postal_code = COALESCE(?, postal_code), latitude = COALESCE(?, latitude), longitude = COALESCE(?, longitude), contact_email = COALESCE(?, contact_email), contact_phone = COALESCE(?, contact_phone), logo_image = COALESCE(?, logo_image), banner_image = COALESCE(?, banner_image), is_verified = COALESCE(?, is_verified), is_active = COALESCE(?, is_active) WHERE shop_id = ?",
      [
        shopData.name,
        shopData.description,
        shopData.category,
        shopData.location,
        shopData.address,
        shopData.city,
        shopData.state,
        shopData.country,
        shopData.postal_code,
        shopData.latitude,
        shopData.longitude,
        shopData.contact_email,
        shopData.contact_phone,
        shopData.logo_image,
        shopData.banner_image,
        shopData.is_verified,
        shopData.is_active,
        shopId,
      ]
    );
    return this.findById(shopId);
  }

  static async delete(shopId: string): Promise<boolean> {
    const [result] = (await pool.query("DELETE FROM shops WHERE shop_id = ?", [shopId])) as RowDataPacket[];
    return result.affectedRows > 0;
  }
}

export default Shop;