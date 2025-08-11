import { RowDataPacket } from "mysql2";
import { IReview, IReviewCreate, IReviewUpdate } from "./types";
import pool from "../../config/database";

class Review {
  static async create(reviewData: IReviewCreate): Promise<IReview> {
    const [result] = (await pool.query(
      "INSERT INTO reviews (review_id, user_id, product_id, order_id, rating, title, comment) VALUES (UUID(), ?, ?, ?, ?, ?, ?)",
      [
        reviewData.user_id,
        reviewData.product_id,
        reviewData.order_id,
        reviewData.rating,
        reviewData.title || null,
        reviewData.comment || null,
      ]
    )) as RowDataPacket[];

    const [rows] = (await pool.query(
      "SELECT * FROM reviews WHERE review_id = ?",
      [result.insertId]
    )) as RowDataPacket[];
    return rows[0] as IReview;
  }

  static async findById(reviewId: string): Promise<IReview | null> {
    const [rows] = (await pool.query(
      "SELECT * FROM reviews WHERE review_id = ?",
      [reviewId]
    )) as RowDataPacket[];
    return (rows[0] as IReview) || null;
  }

  static async findByProduct(
    productId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{ reviews: IReview[]; total: number }> {
    const offset = (page - 1) * limit;
    const [rows] = (await pool.query(
      "SELECT * FROM reviews WHERE product_id = ? AND is_approved = TRUE ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [productId, limit, offset]
    )) as RowDataPacket[];

    const [countResult] = (await pool.query(
      "SELECT COUNT(*) as total FROM reviews WHERE product_id = ? AND is_approved = TRUE",
      [productId]
    )) as RowDataPacket[];

    return {
      reviews: rows as IReview[],
      total: countResult[0].total,
    };
  }

  static async findByUser(
    userId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{ reviews: IReview[]; total: number }> {
    const offset = (page - 1) * limit;
    const [rows] = (await pool.query(
      "SELECT * FROM reviews WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [userId, limit, offset]
    )) as RowDataPacket[];

    const [countResult] = (await pool.query(
      "SELECT COUNT(*) as total FROM reviews WHERE user_id = ?",
      [userId]
    )) as RowDataPacket[];

    return {
      reviews: rows as IReview[],
      total: countResult[0].total,
    };
  }

  static async update(
    reviewId: string,
    reviewData: IReviewUpdate
  ): Promise<IReview | null> {
    await pool.query(
      "UPDATE reviews SET rating = ?, title = ?, comment = ?, is_approved = ? WHERE review_id = ?",
      [
        reviewData.rating || null,
        reviewData.title || null,
        reviewData.comment || null,
        reviewData.is_approved ?? false,
        reviewId,
      ]
    );

    return this.findById(reviewId);
  }

  static async delete(reviewId: string): Promise<boolean> {
    const [result] = (await pool.query(
      "DELETE FROM reviews WHERE review_id = ?",
      [reviewId]
    )) as RowDataPacket[];
    return result.affectedRows > 0;
  }
}

export default Review;
