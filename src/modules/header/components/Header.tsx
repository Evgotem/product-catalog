import React from 'react';
import { Layout, Button, Space } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import s from './Header.module.scss';

interface HeaderProps {
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <Layout.Header className={s.header}>
      <div className={s.logo}>
      
      </div>
      
      <div>
        <Space>
          <Button
            icon={<LogoutOutlined />}
            onClick={onLogout}
            type="text"
          >
            Выйти
          </Button>
        </Space>
      </div>
    </Layout.Header>
  );
};