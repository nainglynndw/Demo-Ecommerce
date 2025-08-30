export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  rating: number;
  reviews: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: string;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: 'name' | 'price' | 'rating' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface ProductListParams extends ProductFilters {
  page?: number;
  limit?: number;
}

export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Clothing',
  'Books',
  'Sports',
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];
