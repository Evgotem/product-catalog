import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store/useAuthStore.ts';
import type { LoginRequest, AuthResponse } from '../model/types';
import { axiosClient } from '@shared/api/axios.ts';

export const useLogin = () => {
  const { setAuth } = useAuthStore();
  
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await axiosClient.post<AuthResponse>('/auth/login', {
        username: data.username,
        password: data.password,
        expiresInMins: 30,
      });
      return response.data;
    },
    onSuccess: (data) => {
      setAuth(data.accessToken, {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      });
    },
  });
};