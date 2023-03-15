import { useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import { ProductCard } from '../ProductCard/ProductCard';

import {
  getPendingSelector,
  getProductsSelector,
  getErrorSelector
} from '../../store/products/selectors';
import { PRODUCTS_PER_PAGE } from '../../constants';
import s from './style.module.scss';

interface ProductsSectionProps {
  makeDispatch: (page: number) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  makeDispatch
}) => {
  const pending = useSelector(getPendingSelector);
  const productsData = useSelector(getProductsSelector);
  const error = useSelector(getErrorSelector);

  return (
    <>
      {productsData?.products?.length ? (
        <>
          <div className={s.products}>
            {productsData?.products?.map((product) => (
              <ProductCard {...product} key={product.id} />
            ))}
          </div>{' '}
          <Pagination
            count={Math.ceil(productsData.totalProducts / PRODUCTS_PER_PAGE)}
            page={productsData.page + 1}
            onChange={(e: React.ChangeEvent<unknown>, page: number) =>
              makeDispatch(page - 1)
            }
            size="small"
            className={s.pagination}
          />
        </>
      ) : (
        ''
      )}
      {pending ? <div>Loading...</div> : ''}
      {error ? <div>Something went wrong...</div> : ''}
    </>
  );
};
