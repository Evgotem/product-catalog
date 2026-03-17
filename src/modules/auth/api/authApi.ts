import type { LoginRequest, AuthResponse } from '../model/types';
import { axiosClient } from '@shared/api/axios.ts';

export const authApi = {
  login: async (data: LoginRequest) => {
    const response = await axiosClient.post<AuthResponse>('/auth/login', {
      username: data.username,
      password: data.password,
      expiresInMins: 30,
    });
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await axiosClient.get('/auth/me');
    return response.data;
  },
  
  refreshToken: async () => {
    const response = await axiosClient.post('/auth/refresh');
    return response.data;
  },
  
  logout: async () => {
    return Promise.resolve();
  },
};