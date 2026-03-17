import React from 'react';
import { Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import { useAuthStore } from '../../store/useAuthStore';

const { Content } = Layout;

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '24px' }}>
        {children}
      </Content>
    </Layout>
  );
};