import { useForm } from 'react-hook-form';
import { CreateProductRequest } from '../../../../../types/product';

export const useCreateProductForm = () => {
  return useForm<CreateProductRequest>({
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: 'Electronics',
      images: [],
      stock: 0,
    },
    mode: 'onChange',
  });
};
