import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, Layout } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { queryClient } from './shared/api/queryClient';
import '@shared/styles/variables.css';
import './index.css'
import { useAuthStore } from '@modules/auth';
import { Header } from '@modules/header';
import {
  LoginPage,
  ProductsPage,
} from '@/pages';


const { Content } = Layout;

function App() {
  const { isAuthenticated, logout } = useAuthStore();
  
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={ruRU}>
        <BrowserRouter basename='/product-catalog'>
          {isAuthenticated ? (
            <Layout style={{ minHeight: '100vh' }}>
              <Header onLogout={logout} />
              <Content style={{ padding: '24px' }}>
                <Routes>
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/" element={<Navigate to="/products" replace />} />
                  <Route path="*" element={<Navigate to="/products" replace />} />
                </Routes>
              </Content>
            </Layout>
          ) : (
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          )}
        </BrowserRouter>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;