import React, { useState, useMemo } from 'react';
import { Table, Input, Typography, Badge, Image } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useProducts } from '../../hooks/useProducts';
import type { Product } from '../../model/types';
import s from './ProductsTable.module.scss';

const { Title, Text } = Typography;

export const ProductsTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchText, setSearchText] = useState('');
  const pageSize = 5;
  
  const { data, isLoading, isFetching } = useProducts(currentPage, pageSize);
  
  // Фильтрация на клиенте для поиска
  const filteredData = useMemo(() => {
    if (!data?.products) return [];
    if (!searchText) return data.products;
    
    return data.products.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchText.toLowerCase()) ||
      product.category.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data?.products, searchText]);
  
  const columns: ColumnsType<Product> = [
    {
      title: 'Наименование',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text, record) => (
        <div className={s.productCell}>
          <Image
            src={record.thumbnail}
            alt={text}
            width={40}
            height={40}
            style={{ objectFit: 'cover', borderRadius: 4 }}
            preview={false}
          />
          <div className={s.productInfo}>
            <Text strong>{text}</Text>
            <Text type="secondary" className={s.category}>
              {record.category}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Вендор',
      dataIndex: 'brand',
      key: 'brand',
      sorter: (a, b) => (a.brand || '').localeCompare(b.brand || ''),
      render: (brand) => brand || '—',
    },
    {
      title: 'Артикул',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'Оценка',
      dataIndex: 'rating',
      key: 'rating',
      sorter: (a, b) => a.rating - b.rating,
      render: (rating) => (
        <Badge
          count={rating.toFixed(1)}
          color={rating >= 4 ? 'green' : rating >= 3 ? 'orange' : 'red'}
          showZero
          overflowCount={5}
        />
      ),
    },
    {
      title: 'Цена, ₽',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      render: (price) => (
        <Text strong>{price.toLocaleString('ru-RU')} ₽</Text>
      ),
    },
  ];
  
  return (
    <div className={s.container}>
      <div className={s.header}>
        <Title level={2}>Товары</Title>
        <Input
          placeholder="Найти"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className={s.searchInput}
          allowClear
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        loading={isLoading || isFetching}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: data?.total || 0,
          onChange: (page) => setCurrentPage(page),
          showSizeChanger: false,
          showTotal: (total) => `Показано 1-${pageSize} из ${total}`,
          position: ['bottomCenter'],
        }}
        className={s.table}
        scroll={{ x: 1000 }}
        bordered={false}
      />
    </div>
  );
};