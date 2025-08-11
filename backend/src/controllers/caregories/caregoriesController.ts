import { Request, Response } from "express";
import Shop from "../../models/shops/shop";
import Category from "../../models/categories/category";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const shop = await Shop.findById(req.body.shop_id);
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
        message: "Not authorized to create category for this shop",
        data: null,
      });
    }

    const category = await Category.create(req.body);
    res.status(201).json({
      status: 201,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error creating category",
      data: null,
    });
  }
};

export const getCategoriesByShop = async (req: Request, res: Response) => {
  try {
    const { shopId } = req.params;
    const { page = 1, limit = 10, searchTerm } = req.query;

    const { categories, total } = await Category.findByShop(
      shopId,
      Number(page),
      Number(limit),
      searchTerm?.toString()
    );
    const totalPages = Math.ceil(total / Number(limit));

    res.status(200).json({
      status: 200,
      message: "Categories retrieved successfully",
      data: categories,
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
      message: "Error retrieving categories",
      data: null,
      pagination: null,
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        status: 404,
        message: "Category not found",
        data: null,
      });
    }

    const shop = await Shop.findById(category.shop_id);
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
        message: "Not authorized to update this category",
        data: null,
      });
    }

    const updatedCategory = await Category.update(req.params.id, req.body);
    res.status(200).json({
      status: 200,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error updating category",
      data: null,
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        status: 404,
        message: "Category not found",
        data: null,
      });
    }

    const shop = await Shop.findById(category.shop_id);
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
        message: "Not authorized to delete this category",
        data: null,
      });
    }

    await Category.delete(req.params.id);
    res.status(200).json({
      status: 200,
      message: "Category deleted successfully",
      data: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error deleting category",
      data: null,
    });
  }
};
