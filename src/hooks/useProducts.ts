import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { ProductApi } from '../services/productApi';
import {
  CreateProductRequest,
  UpdateProductRequest,
  ProductListParams,
} from '../types/product';

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (params: ProductListParams) =>
    [...productKeys.lists(), params] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};

// Get products list with infinite pagination
export const useProducts = (params: Omit<ProductListParams, 'page'> = {}) => {
  return useInfiniteQuery({
    queryKey: productKeys.list(params),
    queryFn: ({ pageParam = 1 }) =>
      ProductApi.getProducts({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.products.length === (params.limit || 10)) {
        return allPages.length + 1;
      }
      return undefined;
    },
    placeholderData: previousData => previousData,
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
    mutationFn: ({
      data,
      userEmail,
    }: {
      data: CreateProductRequest;
      userEmail: string;
    }) => ProductApi.createProduct(data, userEmail),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};

// Update product
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProductRequest) => ProductApi.updateProduct(data),
    onSuccess: updatedProduct => {
      queryClient.setQueryData(
        productKeys.detail(updatedProduct.id),
        updatedProduct,
      );
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};

// Delete product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ProductApi.deleteProduct(id),
    onSuccess: (_data, deletedId) => {
      queryClient.removeQueries({ queryKey: productKeys.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};
