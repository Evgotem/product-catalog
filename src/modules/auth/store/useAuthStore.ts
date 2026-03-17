// src/store/useAuthStore.ts
import { create } from 'zustand';
import type { User } from '../model/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User, remember: boolean) => void;
  logout: () => void;
  // Метод для ручной гидратации при старте приложения
  hydrate: () => void;
}

const STORAGE_KEY = 'auth-storage';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  
  // Ручная гидратация при загрузке страницы
  hydrate: () => {
    // Пробуем взять из localStorage (долгосрочная сессия)
    let data = localStorage.getItem(STORAGE_KEY);
    
    // Если нет, пробуем sessionStorage (текущая вкладка)
    if (!data) {
      data = sessionStorage.getItem(STORAGE_KEY);
    }
    
    if (data) {
      try {
        const parsed = JSON.parse(data);
        set({
          user: parsed.state?.user || null,
          token: parsed.state?.token || null,
          isAuthenticated: !!parsed.state?.token,
        });
      } catch (e) {
        console.error('Failed to parse auth storage', e);
      }
    }
  },
  
  setAuth: (token: string, user: User, remember: boolean) => {
    const stateData = {
      state: {
        user,
        token,
        isAuthenticated: true,
      },
      version: 0,
    };
    
    const serialized = JSON.stringify(stateData);
    
    // Очищаем оба хранилища перед записью, чтобы не было конфликтов
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    
    // Пишем в нужное хранилище
    if (remember) {
      localStorage.setItem(STORAGE_KEY, serialized);
    } else {
      sessionStorage.setItem(STORAGE_KEY, serialized);
    }
    
    // Обновляем состояние в React
    set({
      user,
      token,
      isAuthenticated: true,
    });
  },
  
  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));