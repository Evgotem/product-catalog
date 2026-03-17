import React from 'react';
import { Form, Input, Checkbox, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../hooks/useAuth';
import { loginSchema, type LoginFormData } from '../../model/schemas';
import s from './LoginForm.module.scss';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@modules/auth/store/useAuthStore.ts';

const { Title, Text } = Typography;

export const LoginForm: React.FC = () => {
  const loginMutation = useAuth();
  const { isAuthenticated } = useAuthStore();
  
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    defaultValues: {
      username: '',
      password: '',
      remember: false,
    },
  });
  
  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate({
      username: data.username,
      password: data.password,
    });
  };
  
  if (isAuthenticated) {
    return <Navigate to="/products" replace />;
  }
  
  return (
    <div className={s.container}>
      <div className={s.header}>
        <Title level={2}>Добро пожаловать!</Title>
        <Text type="secondary">Пожалуйста, авторизуйтесь</Text>
      </div>

      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} size="large">
        <Form.Item
          label="Логин"
          validateStatus={errors.username ? 'error' : ''}
          help={errors.username?.message}
        >
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                prefix={<UserOutlined />}
                placeholder="Введите логин"
                disabled={loginMutation.isPending}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Пароль"
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                prefix={<LockOutlined />}
                placeholder="Введите пароль"
                disabled={loginMutation.isPending}
              />
            )}
          />
        </Form.Item>

        <div style={{ marginBottom: 16 }}>
          <Controller
            name="remember"
            control={control}
            render={({ field }) => (
              <Checkbox {...field} checked={field.value} disabled={loginMutation.isPending}>
                Запомнить данные
              </Checkbox>
            )}
          />
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={loginMutation.isPending}
          >
            Войти
          </Button>
        </Form.Item>

        <div style={{ textAlign: 'center' }}>
          <Text type="secondary">Нет аккаунта? </Text>
          <Button type="link" style={{ padding: 0 }}>
            Создать
          </Button>
        </div>
      </Form>
    </div>
  );
};