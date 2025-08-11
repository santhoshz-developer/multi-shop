import { Request, Response } from "express";
import User from "../../models/users/user";
import { IUserCreate, IUserLogin } from "../../models/users/types";

export const register = async (req: Request, res: Response) => {
  try {
    const userData: IUserCreate = req.body;
    const existingUser = await User.findByEmail(userData.email);

    if (existingUser) {
      return res.status(400).json({
        status: 400,
        message: "Email already in use",
        data: null,
      });
    }

    const user = await User.create(userData);
    const token = User.generateToken(user);

    res.status(201).json({
      status: 201,
      message: "User registered successfully",
      data: { user, token },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error registering user",
      data: null,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: IUserLogin = req.body;
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(401).json({
        status: 401,
        message: "Invalid credentials",
        data: null,
      });
    }

    const isMatch = await User.comparePassword(user, password);
    if (!isMatch) {
      return res.status(401).json({
        status: 401,
        message: "Invalid credentials",
        data: null,
      });
    }

    const token = User.generateToken(user);
    res.status(200).json({
      status: 200,
      message: "Login successful",
      data: { user, token },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error logging in",
      data: null,
    });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
        data: null,
      });
    }

    res.status(200).json({
      status: 200,
      message: "Profile retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error retrieving profile",
      data: null,
    });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const user = await User.update(req.user.id, userData);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
        data: null,
      });
    }

    res.status(200).json({
      status: 200,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error updating profile",
      data: null,
    });
  }
};