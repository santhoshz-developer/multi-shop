export interface IReview {
  review_id: string;
  user_id: string;
  product_id: string;
  order_id: string;
  rating: number;
  title?: string;
  comment?: string;
  is_approved: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IReviewCreate {
  user_id: string;
  product_id: string;
  order_id: string;
  rating: number;
  title?: string;
  comment?: string;
}

export interface IReviewUpdate {
  rating?: number;
  title?: string;
  comment?: string;
  is_approved?: boolean;
}