import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import s from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className={s.container}>
      <Result
        status="404"
        title="404"
        subTitle="Извините, страница не найдена"
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            Вернуться на главную
          </Button>
        }
      />
    </div>
  );
};