import axios from 'axios';
import { message } from 'antd';

message.config({
  duration: 5,
  top: 10,
  maxCount: 2,
});

export const axiosClient = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.code === 'ECONNABORTED') {
      message.error('Сервер долго не отвечает. Проверьте подключение к интернету или попробуйте включить впн');
      return Promise.reject(error);
    }
    
    if (!error.response) {
      message.error('Нет подключения к интернету. Проверьте сеть');
      return Promise.reject(error);
    }
    
    const status = error.response.status;
    
    switch (status) {
      case 400:
        message.error('Проверьте правильность заполнения полей');
        break;
      case 401:
        message.error( 'Неверный логин или пароль');
        break;
      case 403:
        message.error( 'У вас нет доступа к этому действию');
        break;
      case 404:
        message.error( 'Запрашиваемые данные не найдены');
        break;
      case 409:
        message.error( 'Такой пользователь уже существует');
        break;
      case 422:
        message.error( 'Ошибка валидации. Проверьте введенные данные');
        break;
      case 429:
        message.error( 'Слишком много запросов. Попробуйте позже');
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        message.error( 'На сервере ведутся технические работы. Попробуйте позже');
        break;
      default:
        message.error( 'Что-то пошло не так. Попробуйте снова');
    }
    
    return Promise.reject(error);
  }
);