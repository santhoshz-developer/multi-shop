import { fetchData, uploadFileData, deleteData } from "../apiService";

export type Shop = {
  id: string;
  name: string;
  categories: { id: string; name: string }[];
  banner_image?: string;
  logo_image?: string;
  location?: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  description?: string;
  category_id?: string;
};

export const fetchStorefrontData = async (shopId: string): Promise<{shop: Shop, categories: any[], products: any[]}> => {
  return fetchData(`/shops/storefront/${shopId}`);
};