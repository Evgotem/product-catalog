import { ProductsResponse } from '../model/types.ts';
import { axiosClient } from '@shared/api/axios.ts';

export const productsApi = {
  getProducts: async (skip = 0, limit = 20) => {
    const response = await axiosClient.get<ProductsResponse>('/products', {
      params: { skip, limit, select: 'title,description,category,price,rating,brand,sku,thumbnail' },
    });
    return response.data;
  },
  
  searchProducts: async (query: string) => {
    const response = await axiosClient.get<ProductsResponse>('/products/search', {
      params: { q: query },
    });
    return response.data;
  },
};