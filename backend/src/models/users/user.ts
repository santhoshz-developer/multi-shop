import { RowDataPacket } from "mysql2";
import { IUser, IUserCreate, IUserUpdate } from "./types";
import bcrypt from "bcryptjs";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "../../config/database";

dotenv.config();

class User {
  static async create(userData: IUserCreate): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const [result] = (await pool.query(
      "INSERT INTO users (user_id, username, email, password_hash, first_name, last_name, phone_number, is_admin, is_shop_owner) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        userData.username,
        userData.email,
        hashedPassword,
        userData.first_name || null,
        userData.last_name || null,
        userData.phone_number || null,
        userData.is_admin || false,
        userData.is_shop_owner || false,
      ]
    )) as RowDataPacket[];

    const [rows] = (await pool.query("SELECT * FROM users WHERE user_id = ?", [
      result.insertId,
    ])) as RowDataPacket[];
    return rows[0] as IUser;
  }

  static async findByEmail(email: string): Promise<IUser | null> {
    const [rows] = (await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ])) as RowDataPacket[];
    return (rows[0] as IUser) || null;
  }

  static async findById(userId: string): Promise<IUser | null> {
    const [rows] = (await pool.query("SELECT * FROM users WHERE user_id = ?", [
      userId,
    ])) as RowDataPacket[];
    return (rows[0] as IUser) || null;
  }

  static async update(
    userId: string,
    userData: IUserUpdate
  ): Promise<IUser | null> {
    await pool.query(
      "UPDATE users SET first_name = ?, last_name = ?, phone_number = ?, profile_image = ? WHERE user_id = ?",
      [
        userData.first_name || null,
        userData.last_name || null,
        userData.phone_number || null,
        userData.profile_image || null,
        userId,
      ]
    );

    return this.findById(userId);
  }

  static async comparePassword(
    user: IUser,
    password: string
  ): Promise<boolean> {
    return bcrypt.compare(password, user.password_hash);
  }

  static generateToken(user: IUser): string {
    const secret: Secret = process.env.JWT_SECRET as Secret;
    const expiresIn = process.env.JWT_EXPIRE as jwt.SignOptions["expiresIn"];

    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    return jwt.sign(
      {
        id: user.user_id,
        isAdmin: user.is_admin,
        isShopOwner: user.is_shop_owner,
      },
      secret,
      { expiresIn }
    );
  }
}

export default User;
