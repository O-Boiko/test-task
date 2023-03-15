import { createSelector } from 'reselect';

import { AppState } from '../rootReducer';

const getPending = (state: AppState) => state.products.pending;

const getProductsData = (state: AppState) => state.products;

const getError = (state: AppState) => state.products.error;

export const getProductsSelector = createSelector(
  getProductsData,
  (products) => products
);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);
