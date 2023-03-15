/* eslint-disable import/no-anonymous-default-export */
import {
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE
} from './actionTypes';

import { ProductsActions, ProductsState } from './types';

const initialState: ProductsState = {
  pending: false,
  products: [],
  totalProducts: 0,
  page: 0,
  error: null
};

export default (state = initialState, action: ProductsActions) => {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        pending: true,
        products: []
      };
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        pending: false,
        products: action.payload.products,
        totalProducts: action.payload.total,
        page: action.payload.page,
        error: null
      };
    case FETCH_PRODUCT_FAILURE:
      return {
        ...state,
        pending: false,
        products: [],
        totalProducts: 0,
        page: 0,
        error: action.payload.error
      };
    default:
      return {
        ...state
      };
  }
};
