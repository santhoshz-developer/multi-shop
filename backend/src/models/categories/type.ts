
export interface ICategory {
  category_id: string;
  shop_id: string;
  name: string;
  description?: string;
  image?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ICategoryCreate {
  shop_id: string;
  name: string;
  description?: string;
  image?: string;
}

export interface ICategoryUpdate {
  name?: string;
  description?: string;
  image?: string;
  is_active?: boolean;
}