import React from 'react';

import s from './ProductsPage.module.scss';
import { ProductsTable } from '@modules/products';

export const ProductsPage: React.FC = () => {
  return (
    <div className={s.container}>
      <ProductsTable />
    </div>
  );
};