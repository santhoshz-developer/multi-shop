import { fetchData, uploadFileData, deleteData } from "../apiService";

// Define the Category type based on your database table
export type Category = {
  id: number;
  shop_id: number;
  name: string;
  description: string;
  image_url: string;
  is_active: boolean; // In TS, booleans are preferred over tinyint
  sort_order: number;
  created_at: string; // Timestamps are typically handled as strings in ISO format
};

/**
 * Fetches all categories for a specific shop.
 * @param shopId - The ID of the shop.
 * @returns A promise that resolves to an array of categories.
 */
export const fetchCategoriesByShop = async (shopId: string): Promise<Category[]> => {
  // Following the URL structure from your example
  return fetchData(`/categories/shop/${shopId}`);
};

/**
 * Creates a new category for a specific shop.
 * @param shopId - The ID of the shop where the category will be created.
 * @param formData - The category data, including name, description, and optionally an image file.
 * @returns A promise that resolves to the newly created category.
 */
export const createCategory = async (shopId: string, formData: FormData): Promise<Category> => {
  return uploadFileData(`/shops/${shopId}/categories`, formData);
};

/**
 * Updates an existing category.
 * @param shopId - The ID of the shop.
 * @param categoryId - The ID of the category to update.
 * @param formData - The updated category data.
 * @returns A promise that resolves to the updated category data.
 */
export const updateCategory = async (
  shopId: string,
  categoryId: number,
  formData: FormData
): Promise<Category> => {
  return uploadFileData(`/shops/${shopId}/categories/${categoryId}`, formData);
};

/**
 * Deletes a category from a shop.
 * @param shopId - The ID of the shop.
 * @param categoryId - The ID of the category to delete.
 * @returns A promise that resolves when the deletion is complete.
 */
export const deleteCategory = async (shopId: string, categoryId: number): Promise<void> => {
  return deleteData(`/shops/${shopId}/categories/${categoryId}`);
};