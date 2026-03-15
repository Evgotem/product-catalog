import {
  FC,
  ReactNode,
} from 'react';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';

interface AppProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<AppProviderProps> = ({ children }) => {
  return (
    <ConfigProvider
      locale={ruRU}
      theme={{
        token: {
          colorPrimary: '#242EDB',
          colorError: '#F32E2E',
          borderRadius: 6,
          fontFamily: 'Open sans, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: 14,
        },
        components: {
          Button: {
            borderRadius: 6,
            paddingInline: 24,
            paddingBlock: 10,
            fontWeight: 500,
          },
          Input: {
            borderRadius: 6,
            paddingInline: 14,
            paddingBlock: 10,
          },
          Checkbox: {
            borderRadius: 6,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};