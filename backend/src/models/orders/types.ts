export interface IOrder {
  order_id: string;
  user_id: string;
  shop_id: string;
  order_number: string;
  total_amount: number;
  discount_amount: number;
  tax_amount: number;
  shipping_amount: number;
  final_amount: number;
  payment_method: 'credit_card' | 'debit_card' | 'upi' | 'net_banking' | 'cash_on_delivery' | 'wallet';
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  order_status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  shipping_address: string;
  billing_address?: string;
  contact_phone: string;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export interface IOrderCreate {
  user_id: string;
  shop_id: string;
  order_number: string;
  total_amount: number;
  discount_amount?: number;
  tax_amount?: number;
  shipping_amount?: number;
  final_amount: number;
  payment_method: 'credit_card' | 'debit_card' | 'upi' | 'net_banking' | 'cash_on_delivery' | 'wallet';
  shipping_address: string;
  billing_address?: string;
  contact_phone: string;
  notes?: string;
  items: IOrderItemCreate[];
}

export interface IOrderItem {
  order_item_id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  discount_amount: number;
  total_price: number;
  created_at: Date;
}

export interface IOrderItemCreate {
  product_id: string;
  quantity: number;
  unit_price: number;
  discount_amount?: number;
}