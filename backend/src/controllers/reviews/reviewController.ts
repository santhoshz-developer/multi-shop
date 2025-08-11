import { Request, Response } from "express";
import Review from "../../models/reviews/review";
import Order from "../../models/orders/order";

export const createReview = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.body.order_id);
    if (!order) {
      return res.status(404).json({
        status: 404,
        message: "Order not found",
        data: null,
      });
    }

    if (order.user_id !== req.user.id) {
      return res.status(403).json({
        status: 403,
        message: "Not authorized to review this order",
        data: null,
      });
    }

    const review = await Review.create({
      ...req.body,
      user_id: req.user.id,
    });

    res.status(201).json({
      status: 201,
      message: "Review created successfully",
      data: review,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error creating review",
      data: null,
    });
  }
};

export const getProductReviews = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    // Assuming Review.findByProduct returns { reviews, total }
    const { reviews, total } = await Review.findByProduct(
      req.params.productId,
      Number(page),
      Number(limit)
    );
    const totalPages = Math.ceil(total / Number(limit));

    res.status(200).json({
      status: 200,
      message: "Reviews retrieved successfully",
      data: reviews,
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
      message: "Error retrieving reviews",
      data: null,
      pagination: null,
    });
  }
};

export const getUserReviews = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    // Assuming Review.findByUser returns { reviews, total }
    const { reviews, total } = await Review.findByUser(
      req.user.id,
      Number(page),
      Number(limit)
    );
    const totalPages = Math.ceil(total / Number(limit));

    res.status(200).json({
      status: 200,
      message: "Reviews retrieved successfully",
      data: reviews,
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
      message: "Error retrieving reviews",
      data: null,
      pagination: null,
    });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({
        status: 404,
        message: "Review not found",
        data: null,
      });
    }

    if (review.user_id !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({
        status: 403,
        message: "Not authorized to update this review",
        data: null,
      });
    }

    const updatedReview = await Review.update(req.params.id, req.body);
    res.status(200).json({
      status: 200,
      message: "Review updated successfully",
      data: updatedReview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error updating review",
      data: null,
    });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({
        status: 404,
        message: "Review not found",
        data: null,
      });
    }

    if (review.user_id !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({
        status: 403,
        message: "Not authorized to delete this review",
        data: null,
      });
    }

    await Review.delete(req.params.id);
    res.status(200).json({
      status: 200,
      message: "Review deleted successfully",
      data: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error deleting review",
      data: null,
    });
  }
};
