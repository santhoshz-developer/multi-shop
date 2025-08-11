// services/shopService.ts

import { fetchData, uploadFileData, deleteData } from "../apiService";

export type Shop = {
  id: string;
  shop_id: string;        // Add this
  name: string;
  description: string;    // Add this
  location: string;       // Add this
  categories: { id: string; name: string }[];
};

export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  description?: string;
};

export const fetchAllShops = async (): Promise<Shop[]> => {
  return fetchData("/shops");
};

export const fetchShopDetails = async (shopId: string): Promise<Shop> => {
  return fetchData(`/shops/${shopId}`);
};

export const fetchShopProducts = async (shopId: string): Promise<Product[]> => {
  return fetchData(`/products/shops/${shopId}`);
};

export const fetchShopCategory = async (shopId: string): Promise<Product[]> => {
  return fetchData(`/categories/shop/${shopId}`);
};

export const createShopProduct = async (shopId: string, formData: FormData) => {
  return uploadFileData(`/shops/${shopId}/products`, formData);
};

export const updateShopProduct = async (
  shopId: string,
  productId: string,
  formData: FormData
) => {
  return uploadFileData(`/shops/${shopId}/products/${productId}`, formData);
};

export const deleteShopProduct = async (shopId: string, productId: string) => {
  return deleteData(`/shops/${shopId}/products/${productId}`);
};
