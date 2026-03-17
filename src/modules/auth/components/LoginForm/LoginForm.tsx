import React from 'react';
import {
  Form,
  Input,
  Checkbox,
  Button,
  Typography,
  message,
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  BugOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useAuth,
} from '../../hooks/useAuth';
import { loginSchema, type LoginFormData } from '../../model/schemas';
import s from './LoginForm.module.scss';

const { Title, Text } = Typography;

// Тестовые данные
const TEST_CREDENTIALS = {
  username: 'emilys',
  password: 'emilyspass',
};

export const LoginForm: React.FC = () => {
  const loginMutation = useAuth();
  
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
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
      remember: data.remember,
    });
  };
  
  const fillTestData = () => {
    setValue('username', TEST_CREDENTIALS.username);
    setValue('password', TEST_CREDENTIALS.password);
    trigger();
  };
  
  const handleCreateClick = () => {
    message.open({
      type: 'success',
      icon: <SmileOutlined />,
      content: 'Функция создания аккаунта в разработке. Но вы можете войти под тестовым пользователем emilys / emilyspass',
      duration: 5,
    });
  };
  
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

        <div className={s.checkboxWrapper}>
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
        
        {/* Кнопка для тестовых данных */}
        <div className={s.testButtonWrapper}>
          <Button
            icon={<BugOutlined />}
            onClick={fillTestData}
            disabled={loginMutation.isPending}
            block
          >
            Заполнить тестовыми данными
          </Button>
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

        <div className={s.footer}>
          <Text type="secondary">Нет аккаунта? </Text>
          <Button type="link" style={{ padding: 0 }} onClick={handleCreateClick}>
            Создать
          </Button>
        </div>
      </Form>
    </div>
  );
};