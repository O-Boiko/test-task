import { rest } from 'msw';
import { products } from '../fixtures/products';
import { Product, SortBy } from '../../store/products/types';
import { PRODUCTS_PER_PAGE } from '../../constants';

const products_on_page = (search_products: Product[], page = 0) =>
  search_products.slice(
    PRODUCTS_PER_PAGE * page,
    PRODUCTS_PER_PAGE * (page + 1)
  );

const sort = (search_products: Product[], sort_by: SortBy) => {
  switch (sort_by) {
    case SortBy.Rating:
      return search_products.sort((a, b) => b.rating - a.rating);
    case SortBy.IncreasingPrice:
      return search_products.sort((a, b) => a.price - b.price);
    case SortBy.DecreasingPrice:
      return search_products.sort((a, b) => b.price - a.price);
  }
};

const handler = rest.post('*/api/search', async (req, res, ctx) => {
  const { search_string, color, min_price, max_price, sort_by, page } =
    await req.json();

  let search_products = products;
  if (search_string || color || min_price || max_price) {
    search_products = products.filter(
      (item) =>
        (!search_string ||
          item.title
            .toLocaleLowerCase()
            .includes(search_string.toLocaleLowerCase())) &&
        (!color?.length ||
          color.some((colorItem: string) => item.color === colorItem)) &&
        (!min_price || item.price >= min_price) &&
        (!max_price || item.price <= max_price)
    );
  }
  if (sort_by) {
    search_products = sort(search_products, sort_by);
  }
  return res(
    ctx.status(200),
    ctx.json({
      products: products_on_page(search_products, page),
      total: search_products.length,
      page
    })
  );
});

export default handler;
