import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { OrderApi } from '../services/orderApi';
import { CreateOrderRequest } from '../types/order';

// Query keys
export const orderKeys = {
  all: ['orders'] as const,
  byEmail: (email: string) => [...orderKeys.all, 'email', email] as const,
  detail: (id: string) => [...orderKeys.all, 'detail', id] as const,
};

// Get orders by user email
export const useOrders = (userEmail: string) => {
  return useQuery({
    queryKey: orderKeys.byEmail(userEmail),
    queryFn: () => OrderApi.getOrdersByEmail(userEmail),
    enabled: !!userEmail,
  });
};

// Get single order by ID
export const useOrder = (id: string) => {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => OrderApi.getOrder(id),
    enabled: !!id,
  });
};

// Create new order
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      productName,
      productPrice,
      userEmail,
    }: {
      data: CreateOrderRequest;
      productName: string;
      productPrice: number;
      userEmail: string;
    }) => OrderApi.createOrder(data, productName, productPrice, userEmail),
    onSuccess: (newOrder) => {
      // Invalidate orders for this user
      queryClient.invalidateQueries({
        queryKey: orderKeys.byEmail(newOrder.customerEmail),
      });
    },
  });
};