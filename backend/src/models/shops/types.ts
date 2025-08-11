
export interface IShop {
  shop_id: string;
  owner_id: string;
  name: string;
  description?: string;
  category: string;
  location: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
  contact_email?: string;
  contact_phone?: string;
  logo_image?: string;
  banner_image?: string;
  qr_code_url?: string;
  is_verified: boolean;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IShopCreate {
  owner_id: string;
  name: string;
  description?: string;
  category: string;
  location: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
  contact_email?: string;
  contact_phone?: string;
  logo_image?: string;
  banner_image?: string;
}

export interface IShopUpdate {
  name?: string;
  description?: string;
  category?: string;
  location?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
  contact_email?: string;
  contact_phone?: string;
  logo_image?: string;
  banner_image?: string;
  is_verified?: boolean;
  is_active?: boolean;
}