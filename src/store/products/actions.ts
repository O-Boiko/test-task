import { FETCH_PRODUCT_REQUEST } from './actionTypes';
import { FetchProductsRequest, ProductsRequestData } from './types';

export const fetchProductsRequest = (
  data: ProductsRequestData
): FetchProductsRequest => ({
  type: FETCH_PRODUCT_REQUEST,
  data
});
