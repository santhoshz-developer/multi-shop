import { Request, Response } from "express";
import Shop from "../../models/shops/shop";
import { createResponse } from "../../utils/apiResponse";
import pool from "../../config/database";

export const createShop = async (req: Request, res: Response) => {
  try {
    const shopData = { ...req.body, owner_id: req.user.id };
    const shop = await Shop.create(shopData);
    res.status(201).json({
      status: 201,
      message: "Shop created successfully",
      data: shop,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error creating shop",
      data: null,
    });
  }
};

export const getShops = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, searchTerm } = req.query;

    const { shops, total } = await Shop.findAll(
      Number(page),
      Number(limit),
      searchTerm?.toString()
    );

    const totalPages = Math.ceil(total / Number(limit));

    res.status(200).json({
      status: 200,
      message: "Shops retrieved successfully",
      data: shops,
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
      message: "Error retrieving shops",
      data: null,
      pagination: null,
    });
  }
};

export const getShopById = async (req: Request, res: Response) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) {
      return res.status(404).json({
        status: 404,
        message: "Shop not found",
        data: null,
      });
    }
    res.status(200).json({
      status: 200,
      message: "Shop retrieved successfully",
      data: shop,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error retrieving shop",
      data: null,
    });
  }
};

export const getShopsByOwner = async (req: Request, res: Response) => {
  try {
    const { ownerId } = req.params;
    const { page = 1, limit = 10, searchTerm } = req.query;

    if (!ownerId) {
      return res.status(400).json({
        status: 400,
        message: "Owner ID is required",
        data: null,
      });
    }

    const { shops, total } = await Shop.findByOwner(
      ownerId,
      Number(page),
      Number(limit),
      searchTerm?.toString()
    );
    const totalPages = Math.ceil(total / Number(limit));

    if (!shops.length) {
      return res.status(404).json({
        status: 404,
        message: "No shops found for this owner",
        data: [],
        pagination: {
          totalCount: total,
          page: Number(page),
          limit: Number(limit),
          totalPages,
        },
      });
    }

    res.status(200).json({
      status: 200,
      message: "Shops retrieved successfully",
      data: shops,
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
      message: "Error retrieving shops",
      data: null,
      pagination: null,
    });
  }
};

export const getMyShops = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, searchTerm } = req.query;
    const { shops, total } = await Shop.findByOwner(
      req.user.id,
      Number(page),
      Number(limit),
      searchTerm?.toString()
    );
    const totalPages = Math.ceil(total / Number(limit));

    res.status(200).json({
      status: 200,
      message: "Shops retrieved successfully",
      data: shops,
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
      message: "Error retrieving shops",
      data: null,
      pagination: null,
    });
  }
};

export const updateShop = async (req: Request, res: Response) => {
  try {
    const shop = await Shop.findById(req.params.id);
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
        message: "Not authorized to update this shop",
        data: null,
      });
    }

    const updatedShop = await Shop.update(req.params.id, req.body);
    res.status(200).json({
      status: 200,
      message: "Shop updated successfully",
      data: updatedShop,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error updating shop",
      data: null,
    });
  }
};

export const deleteShop = async (req: Request, res: Response) => {
  try {
    const shop = await Shop.findById(req.params.id);
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
        message: "Not authorized to delete this shop",
        data: null,
      });
    }

    await Shop.delete(req.params.id);
    res.status(200).json({
      status: 200,
      message: "Shop deleted successfully",
      data: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error deleting shop",
      data: null,
    });
  }
};

export const getShopStorefrontData = async (req: Request, res: Response) => {
  const { shopId } = req.params;

  if (!shopId) {
    return res.status(400).json({
      status: 400,
      message: "Shop ID is required",
      data: null,
    });
  }

  try {
    const [shopResult, categoriesResult, productsResult] = await Promise.all([
      pool.query("SELECT * FROM shops WHERE shop_id = ? AND is_active = TRUE", [
        shopId,
      ]),
      pool.query(
        "SELECT * FROM categories WHERE shop_id = ? AND is_active = TRUE ORDER BY name ASC",
        [shopId]
      ),
      pool.query(
        `SELECT p.*, pi.image_url AS primary_image_url
         FROM products p
         LEFT JOIN product_images pi ON p.product_id = pi.product_id AND pi.is_primary = TRUE
         WHERE p.shop_id = ? AND p.is_active = TRUE`,
        [shopId]
      ),
    ]);

    const shops = shopResult[0] as any[];
    if (!shops.length) {
      return res.status(404).json({
        status: 404,
        message: "Shop not found or is inactive",
        data: null,
      });
    }

    res.status(200).json({
      status: 200,
      message: "Storefront data retrieved successfully",
      data: {
        shop: shops[0],
        categories: categoriesResult[0],
        products: productsResult[0],
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error fetching storefront data",
      data: null,
    });
  }
};