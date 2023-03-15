import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Search } from './components/Search/Search';
import { SortByRadioGroup } from './components/SortBy/SortBy';
import { ColorFilter } from './components/ColorFilter/ColorFilter';
import { PriceFilter } from './components/PriceFilter/PriceFilter';
import { ProductsSection } from './components/ProductsSection/ProductsSection';

import { fetchProductsRequest } from './store/products/actions';
import { Color, SortBy } from './store/products/types';
import s from './App.module.scss';

function App() {
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [colors, setColors] = useState<Color[]>([]);
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
          <ColorFilter colors={colors} setColors={setColors} />
          <PriceFilter
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            onKeyDown={keyPress}
            setMaxPrice={setMaxPrice}
          />
        </aside>
        <section className={s.productsSection}>
          <ProductsSection makeDispatch={makeDispatch} />
        </section>
      </div>
    </div>
  );
}

export default App;
