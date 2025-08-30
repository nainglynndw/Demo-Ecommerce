import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  ProductListResponse,
  ProductListParams,
} from '../types/product';
import { mockProducts } from './mockProducts';

const STORAGE_KEY = 'products';

const delay = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));

export class ProductApi {
  private static async getStoredProducts(): Promise<Product[]> {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      // Initialize with mock data if no stored products
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(mockProducts));
      return mockProducts;
    } catch (error) {
      console.error('Error getting stored products:', error);
      return mockProducts;
    }
  }

  private static async saveProducts(products: Product[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (error) {
      console.error('Error saving products:', error);
    }
  }

  static async getProducts(
    params: ProductListParams = {},
  ): Promise<ProductListResponse> {
    await delay(300); // Simulate network delay

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

    let products = await this.getStoredProducts();

    // Apply filters
    if (category) {
      products = products.filter(p => p.category === category);
    }

    if (minPrice !== undefined) {
      products = products.filter(p => p.price >= minPrice);
    }

    if (maxPrice !== undefined) {
      products = products.filter(p => p.price <= maxPrice);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      products = products.filter(
        p =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower),
      );
    }

    // Apply sorting
    products.sort((a, b) => {
      let aValue: any = a[sortBy];
      let bValue: any = b[sortBy];

      if (sortBy === 'price' || sortBy === 'rating') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
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
  }

  static async getProduct(id: string): Promise<Product | null> {
    await delay(500);

    const products = await this.getStoredProducts();
    return products.find(p => p.id === id) || null;
  }

  static async createProduct(data: CreateProductRequest): Promise<Product> {
    await delay(1000);

    const products = await this.getStoredProducts();

    const newProduct: Product = {
      ...data,
      id: Date.now().toString(),
      rating: 0,
      reviews: 0,
      createdBy: 'current_user', // In real app, get from auth
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedProducts = [newProduct, ...products];
    await this.saveProducts(updatedProducts);

    return newProduct;
  }

  static async updateProduct(data: UpdateProductRequest): Promise<Product> {
    await delay(800);

    const products = await this.getStoredProducts();
    const index = products.findIndex(p => p.id === data.id);

    if (index === -1) {
      throw new Error('Product not found');
    }

    const updatedProduct = {
      ...products[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    products[index] = updatedProduct;
    await this.saveProducts(products);

    return updatedProduct;
  }

  static async deleteProduct(id: string): Promise<void> {
    await delay(600);

    const products = await this.getStoredProducts();
    const filteredProducts = products.filter(p => p.id !== id);
    await this.saveProducts(filteredProducts);
  }
}
