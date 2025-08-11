
export interface IProduct {
  product_id: string;
  shop_id: string;
  category_id: string;
  name: string;
  description?: string;
  price: number;
  discounted_price?: number;
  stock_quantity: number;
  sku?: string;
  barcode?: string;
  weight?: number;
  weight_unit?: string;
  main_image: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IProductCreate {
  shop_id: string;
  category_id: string;
  name: string;
  description?: string;
  price: number;
  discounted_price?: number;
  stock_quantity: number;
  sku?: string;
  barcode?: string;
  weight?: number;
  weight_unit?: string;
  main_image: string;
}

export interface IProductUpdate {
  category_id?: string;
  name?: string;
  description?: string;
  price?: number;
  discounted_price?: number;
  stock_quantity?: number;
  sku?: string;
  barcode?: string;
  weight?: number;
  weight_unit?: string;
  main_image?: string;
  is_active?: boolean;
}