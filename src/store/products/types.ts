import {
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE
} from './actionTypes';

export type Product = {
  title: string;
  description: string;
  price: number;
  currency: string;
  color: Color;
  rating: number;
  icon: string;
  id: number;
};

export enum Color {
  Black = 'black',
  Red = 'red',
  White = 'white',
  Blue = 'blue',
  Gray = 'gray',
  Brown = 'brown'
}

export enum SortBy {
  IncreasingPrice = 'increasing',
  DecreasingPrice = 'decreasing',
  Rating = 'rating'
}

export interface ProductsRequestData {
  searchString?: string;
  color?: Color[];
  minPrice?: number;
  maxPrice?: number;
  sortBy?: SortBy;
  page?: number;
}

export interface ProductsState {
  pending: boolean;
  products: Product[];
  totalProducts: number;
  page: number;
  error: string | null;
}

export interface FetchProductsSuccessPayload {
  products: Product[];
  total: number;
  page: number;
}

export interface FetchProductsFailurePayload {
  error: string;
}
export interface FetchProductsRequest {
  type: typeof FETCH_PRODUCT_REQUEST;
  data: ProductsRequestData;
}

export type FetchProductsSuccess = {
  type: typeof FETCH_PRODUCT_SUCCESS;
  payload: FetchProductsSuccessPayload;
};

export type FetchProductsFailure = {
  type: typeof FETCH_PRODUCT_FAILURE;
  payload: FetchProductsFailurePayload;
};

export type ProductsActions =
  | FetchProductsRequest
  | FetchProductsSuccess
  | FetchProductsFailure;
