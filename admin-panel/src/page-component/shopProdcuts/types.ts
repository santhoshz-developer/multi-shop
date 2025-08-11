
// Define Product and Shop interfaces
export interface Product {
  product_id: string;
  shop_id: string;
  category_id: string;
  name: string;
  description: string;
  price: string;
  discounted_price: string | null;
  stock_quantity: number;
  weight: string;
  weight_unit: string;
  barcode: string;
  sku: string;
  main_image: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface ShopCategory {
  id: string;
  name: string;
}

export interface ShopData {
  shop_id: string;
  name: string;
  location: string;
  description: string;
  qr_code_url?: string;
}

export interface Shop extends ShopData {
  categories: ShopCategory[];
}
