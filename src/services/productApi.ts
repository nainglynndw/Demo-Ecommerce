import {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  ProductListResponse,
  ProductListParams,
} from '../types/product';
import {
  findProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsWithFilters,
} from './mockProducts';
import { ApiErrorHandler } from './apiErrorHandler';
import { delay } from '../utils';

export class ProductApi {
  static async getProducts(
    params: ProductListParams = {},
  ): Promise<ProductListResponse> {
    return ApiErrorHandler.intercept('/products', async () => {
      await delay(300);

      const {
        page = 1,
        limit = 10,
        category,
        minPrice,
        maxPrice,
        search,
        sortBy = 'createdAt',
        sortOrder = 'desc',
      } = params;

      // Use mockProducts as database/server
      const products = getProductsWithFilters({
        category,
        minPrice,
        maxPrice,
        search,
        sortBy,
        sortOrder,
      });

      // Apply pagination
      const total = products.length;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedProducts = products.slice(startIndex, endIndex);

      return {
        products: paginatedProducts,
        total,
        page,
        limit,
      };
    });
  }

  static async getProduct(id: string): Promise<Product | null> {
    return ApiErrorHandler.intercept(`/products/${id}`, async () => {
      await delay(500);

      // Call server (mockProducts) to get product
      const product = findProductById(id);
      return product || null;
    });
  }

  static async createProduct(
    data: CreateProductRequest,
    userEmail: string,
  ): Promise<Product> {
    return ApiErrorHandler.intercept('/products', async () => {
      await delay(1000);

      // Create new product on server (mockProducts)
      const newProduct = addProduct({
        ...data,
        rating: 0,
        reviews: 0,
        createdBy: userEmail,
      });

      return newProduct;
    });
  }

  static async updateProduct(data: UpdateProductRequest): Promise<Product> {
    return ApiErrorHandler.intercept(`/products/${data.id}`, async () => {
      await delay(800);

      // Call server to update product
      const updatedProduct = updateProduct(data.id, data);
      if (!updatedProduct) {
        throw new Error('Product not found');
      }

      return updatedProduct;
    });
  }

  static async deleteProduct(id: string): Promise<void> {
    return ApiErrorHandler.intercept(`/products/${id}`, async () => {
      await delay(600);

      // Call server to delete product
      const success = deleteProduct(id);
      if (!success) {
        throw new Error('Product not found');
      }
    });
  }
}
