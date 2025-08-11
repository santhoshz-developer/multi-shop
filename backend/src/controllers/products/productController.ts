import { Request, Response } from "express";
import Product from "../../models/products/product";
import Category from "../../models/categories/category";
import Shop from "../../models/shops/shop";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.body.category_id);
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
        message: "Not authorized to create product for this shop",
        data: null,
      });
    }

    const product = await Product.create(req.body);
    res.status(201).json({
      status: 201,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error creating product",
      data: null,
    });
  }
};

export const getProductsByShop = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    // Assuming Product.findByShop returns { products, total }
    const { products, total } = await Product.findByShop(
      req.params.shopId,
      Number(page),
      Number(limit)
    );
    const totalPages = Math.ceil(total / Number(limit));

    res.status(200).json({
      status: 200,
      message: "Products retrieved successfully",
      data: products,
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
      message: "Error retrieving products",
      data: null,
      pagination: null,
    });
  }
};

export const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    // Assuming Product.findByCategory returns { products, total }
    const { products, total } = await Product.findByCategory(
      req.params.categoryId,
      Number(page),
      Number(limit)
    );
    const totalPages = Math.ceil(total / Number(limit));

    res.status(200).json({
      status: 200,
      message: "Products retrieved successfully",
      data: products,
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
      message: "Error retrieving products",
      data: null,
      pagination: null,
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        status: 404,
        message: "Product not found",
        data: null,
      });
    }

    res.status(200).json({
      status: 200,
      message: "Product retrieved successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error retrieving product",
      data: null,
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        status: 404,
        message: "Product not found",
        data: null,
      });
    }

    const category = await Category.findById(product.category_id);
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
        message: "Not authorized to update this product",
        data: null,
      });
    }

    const updatedProduct = await Product.update(req.params.id, req.body);
    res.status(200).json({
      status: 200,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error updating product",
      data: null,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        status: 404,
        message: "Product not found",
        data: null,
      });
    }

    const category = await Category.findById(product.category_id);
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
        message: "Not authorized to delete this product",
        data: null,
      });
    }

    await Product.delete(req.params.id);
    res.status(200).json({
      status: 200,
      message: "Product deleted successfully",
      data: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error deleting product",
      data: null,
    });
  }
};
