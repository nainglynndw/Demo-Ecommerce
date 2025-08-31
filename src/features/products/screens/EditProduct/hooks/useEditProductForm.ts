import { useForm } from 'react-hook-form';
import { UpdateProductRequest } from '@app-types/product';

export const useEditProductForm = () => {
  return useForm<UpdateProductRequest>({
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