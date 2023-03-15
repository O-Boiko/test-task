import { all, fork } from 'redux-saga/effects';

import productsSaga from './products/sagas';

export function* rootSaga() {
  yield all([fork(productsSaga)]);
}
