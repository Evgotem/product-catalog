import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../api/productsApi';

export const useProducts = (page: number, limit: number = 20) => {
  const skip = (page - 1) * limit;
  
  return useQuery({
    queryKey: ['products', page, limit],
    queryFn: () => productsApi.getProducts(skip, limit),
    placeholderData: (previousData) => previousData, // keep previous data while loading
  });
};