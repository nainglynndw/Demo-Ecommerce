import AsyncStorage from '@react-native-async-storage/async-storage';
import { Order, CreateOrderRequest } from '../types/order';
import { ApiErrorHandler } from './apiErrorHandler';

const STORAGE_KEY = 'orders';

const delay = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));

export class OrderApi {
  private static async getStoredOrders(): Promise<Order[]> {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error getting stored orders:', error);
      return [];
    }
  }

  private static async saveOrders(orders: Order[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch (error) {
      console.error('Error saving orders:', error);
    }
  }

  static async createOrder(
    data: CreateOrderRequest,
    productName: string,
    productPrice: number,
    userEmail: string,
  ): Promise<Order> {
    return ApiErrorHandler.intercept('/orders', async () => {
      await delay(800);

      const orders = await this.getStoredOrders();

      const newOrder: Order = {
        id: Date.now().toString(),
        productId: data.productId,
        productName,
        productPrice,
        quantity: data.quantity,
        totalAmount: productPrice * data.quantity,
        customerEmail: userEmail,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        shippingAddress: data.shippingAddress,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const updatedOrders = [newOrder, ...orders];
      await this.saveOrders(updatedOrders);

      return newOrder;
    });
  }

  static async getOrdersByEmail(userEmail: string): Promise<Order[]> {
    return ApiErrorHandler.intercept(`/orders?customerEmail=${userEmail}`, async () => {
      await delay(300);

      const orders = await this.getStoredOrders();
      return orders.filter(order => order.customerEmail === userEmail);
    });
  }

  static async getOrder(id: string): Promise<Order | null> {
    return ApiErrorHandler.intercept(`/orders/${id}`, async () => {
      await delay(200);

      const orders = await this.getStoredOrders();
      return orders.find(order => order.id === id) || null;
    });
  }
}