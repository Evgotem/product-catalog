import React from 'react';
import s from './LoginPage.module.scss';
import { LoginForm } from '@modules/auth';

export const LoginPage: React.FC = () => {

  return (
    <div className={s.container}>
      <LoginForm />
    </div>
  );
};