import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Pagination from '@mui/material/Pagination';

import { Search } from './components/Search/Search';
import { SortByRadioGroup } from './components/SortBy/SortBy';
import { ProductCard } from './components/ProductCard/ProductCard';
import { PRODUCTS_PER_PAGE } from './constants';
import s from './App.module.scss';

import {
  getPendingSelector,
  getProductsSelector,
  getErrorSelector
} from './store/products/selectors';
import { fetchProductsRequest } from './store/products/actions';
import { Color, SortBy } from './store/products/types';

function App() {
  const dispatch = useDispatch();
  const pending = useSelector(getPendingSelector);
  const productsData = useSelector(getProductsSelector);
  const error = useSelector(getErrorSelector);
  const [searchString, setSearchString] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [colors, setColors] = useState<Color[]>([]);
  // const [page, setPage] = useState<number>(0);
  const [sortBy, setSortBy] = useState<SortBy | null>(null);

  useEffect(() => {
    dispatch(fetchProductsRequest({}));
  }, [dispatch]);

  useEffect(() => {
    makeDispatch(null);
  }, [colors, minPrice, maxPrice, sortBy]);

  const keyPress = (e: any) => {
    if (e.keyCode === 13) {
      makeDispatch(null);
    }
  };

  const makeDispatch = (page: number | null) => {
    dispatch(
      fetchProductsRequest({
        searchString: searchString,
        page: page ?? 0,
        ...{ ...(colors.length ? { color: colors } : {}) },
        ...{ ...(minPrice ? { minPrice } : {}) },
        ...{ ...(maxPrice ? { maxPrice } : {}) },
        ...{ ...(sortBy ? { sortBy } : {}) }
      })
    );
  };

  return (
    <div className={s.appContainer}>
      <Search
        value={searchString}
        onChange={(e) => setSearchString(e.target?.value)}
        onKeyDown={keyPress}
      />
      <SortByRadioGroup sortByCallback={setSortBy} />
      <div className={s.main}>
        <aside>
          <Box component="div">
            <FormLabel>Color</FormLabel>
            <FormGroup>
              {Object.values(Color).map((color) => (
                <FormControlLabel
                  onChange={(e: any) => {
                    const colorsFilter = e.target?.checked
                      ? [color, ...colors]
                      : colors.filter((e) => e !== color);
                    setColors(colorsFilter);
                  }}
                  control={<Checkbox />}
                  label={color}
                  key={color}
                />
              ))}
            </FormGroup>
          </Box>
          <Box component="div">
            <FormLabel>Price</FormLabel>
            <Box component="div">
              <TextField
                id="min"
                {...(minPrice ? { value: minPrice } : {})}
                onChange={(e: any) =>
                  e.target?.value >= 0 && setMinPrice(e.target?.value)
                }
                onKeyDown={keyPress}
                label="min"
                variant="filled"
                type="number"
                size="small"
                className={s.price}
              />
              <TextField
                id="max"
                {...(maxPrice ? { value: maxPrice } : {})}
                onChange={(e: any) =>
                  e.target?.value >= 0 && setMaxPrice(e.target?.value)
                }
                onKeyDown={keyPress}
                label="max"
                variant="filled"
                type="number"
                size="small"
                className={s.price}
              />
            </Box>
          </Box>
        </aside>
        <section className={s.productsSection}>
          {productsData?.products?.length ? (
            <div className={s.products}>
              {productsData?.products?.map((product) => (
                <ProductCard {...product} key={product.id} />
              ))}
            </div>
          ) : (
            ''
          )}
          {pending ? <div>Loading...</div> : ''}
          {error ? <div>Something went wrong...</div> : ''}
          {productsData?.products?.length ? (
            <Pagination
              count={Math.ceil(productsData.totalProducts / PRODUCTS_PER_PAGE)}
              page={productsData.page + 1}
              onChange={(e: React.ChangeEvent<unknown>, page: number) =>
                makeDispatch(page - 1)
              }
              size="small"
              className={s.pagination}
            />
          ) : (
            ''
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
