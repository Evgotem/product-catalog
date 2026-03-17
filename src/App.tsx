import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { queryClient } from './shared/api/queryClient';
import '@shared/styles/variables.css';
import './index.css'
import { useAuthStore } from '@modules/auth';
import { Header } from '@modules/header';
import { ProtectedRoute } from '@modules/auth/components/ProtectedRoute/ProtectedRoute';
import {
  LoginPage,
  NotFoundPage,
  ProductsPage,
} from '@/pages';

const basename = import.meta.env.VITE_BASE_URL || '';

function App() {
  const { isAuthenticated } = useAuthStore();
  
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={ruRU}>
        <BrowserRouter basename={basename}>
          {isAuthenticated && <Header onLogout={useAuthStore.getState().logout} />}
          
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <ProductsPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/"
              element={
                <Navigate to={isAuthenticated ? "/products" : "/login"} replace />
              }
            />
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;