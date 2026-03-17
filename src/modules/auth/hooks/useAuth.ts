import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../store/useAuthStore';
import type { LoginRequest } from '../model/types';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (data, variables) => {
      // Передаем флаг remember из переменных запроса
      setAuth(data.accessToken, {
        id: data.id,
        username: data.username,
        email: data.email,
      }, variables.remember ?? false);
      navigate('/products', { replace: true });
    },
  });
};