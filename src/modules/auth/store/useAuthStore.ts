import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, User } from '../model/types';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      setAuth: (token: string, user: User) => {
        set({
          user,
          token,
          isAuthenticated: true
        });
      },
      
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false
        });
        localStorage.removeItem('token');
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);