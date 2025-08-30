import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {ProductApi} from '../services/productApi';
import {
  CreateProductRequest,
  UpdateProductRequest,
  ProductListParams,
} from '../types/product';

// Query keys
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (params: ProductListParams) => [...productKeys.lists(), params] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};

// Get products list with filters/pagination
export const useProducts = (params: ProductListParams = {}) => {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => ProductApi.getProducts(params),
    placeholderData: (previousData) => previousData,
  });
};

// Get single product by ID
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => ProductApi.getProduct(id),
    enabled: !!id,
  });
};

// Create new product
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({data, userEmail}: {data: CreateProductRequest; userEmail: string}) =>
      ProductApi.createProduct(data, userEmail),
    onSuccess: () => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({queryKey: productKeys.lists()});
    },
  });
};

// Update product
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProductRequest) => ProductApi.updateProduct(data),
    onSuccess: (updatedProduct) => {
      // Update the product in cache
      queryClient.setQueryData(
        productKeys.detail(updatedProduct.id),
        updatedProduct
      );
      // Invalidate products list to reflect changes
      queryClient.invalidateQueries({queryKey: productKeys.lists()});
    },
  });
};

// Delete product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ProductApi.deleteProduct(id),
    onSuccess: (_data, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({queryKey: productKeys.detail(deletedId)});
      // Invalidate products list
      queryClient.invalidateQueries({queryKey: productKeys.lists()});
    },
  });
};