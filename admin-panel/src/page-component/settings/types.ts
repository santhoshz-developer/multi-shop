
export interface Shop {
  shop_id: string;
  owner_id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  contact_email: string;
  contact_phone: string;
  logo_image: string; // Renamed from logo_image_url for consistency
  banner_image: string; // Renamed from banner_image_url
  qr_code_url: string;
  is_verified: boolean; // Changed to boolean for easier handling
  is_active: boolean; // Changed to boolean
  created_at: string; // Dates are typically strings in JSON
  updated_at: string;
}
