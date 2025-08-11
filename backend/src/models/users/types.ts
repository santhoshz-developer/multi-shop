
export interface IUser {
  user_id: string;
  username: string;
  email: string;
  password_hash: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  profile_image?: string;
  is_admin: boolean;
  is_shop_owner: boolean;
  created_at: Date;
  updated_at: Date;
  last_login?: Date;
  status: 'active' | 'suspended' | 'deleted';
}

export interface IUserCreate {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  is_admin?: boolean;
  is_shop_owner?: boolean;
}

export interface IUserUpdate {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  profile_image?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}