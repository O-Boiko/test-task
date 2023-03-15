import axios, { AxiosResponse, AxiosError } from 'axios';
import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { Effect } from '@redux-saga/types';
import {
  FetchProductsRequest,
  ProductsRequestData,
  FetchProductsSuccessPayload
} from './types';
import {
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_FAILURE,
  FETCH_PRODUCT_SUCCESS
} from './actionTypes';

export const submitToServer = (
  data: ProductsRequestData
): Promise<AxiosResponse<ProductsRequestData>> => {
  const { searchString, color, minPrice, maxPrice, sortBy, page } = data;
  return axios.post<FetchProductsSuccessPayload>('/api/search', {
    search_string: searchString,
    color,
    min_price: minPrice,
    max_price: maxPrice,
    sort_by: sortBy,
    page
  });
};

export function* callSubmit(action: FetchProductsRequest): any {
  try {
    const result = yield call(submitToServer, action.data);
    yield put({ type: FETCH_PRODUCT_SUCCESS, payload: result?.data });
  } catch (e) {
    const error = e as Error | AxiosError;
    yield put({ type: FETCH_PRODUCT_FAILURE, payload: error.message ?? error });
  }
}
export function* submitSaga(): Generator<Effect> {
  yield takeLatest(FETCH_PRODUCT_REQUEST, callSubmit);
}

export default function* root() {
  yield fork(submitSaga);
}
