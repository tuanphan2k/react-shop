import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* getProductListSaga(action) {
  try {
    const params = action.payload;

    const stringUrl = params.stringUrl;
    delete params.stringUrl;

    const result = yield axios({
      method: "GET",
      url: `http://localhost:3005/products${stringUrl}`,
      params: {
        ...params,
      },
    });
    yield put({
      type: "GET_PRODUCT_LIST_SUCCESS",
      payload: {
        data: result.data,
        totalRow: result.headers["x-total-count"],
      },
    });
  } catch (e) {
    yield put({
      type: "GET_PRODUCT_LIST_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}

function* getCategoryListSaga(action) {
  const params = action.payload;
  try {
    const result = yield axios({
      method: "GET",
      url: "http://localhost:3005/categories",
      params: {
        ...params,
      },
    });
    yield put({
      type: "GET_CATEGORY_LIST_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_CATEGORY_LIST_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}

function* getTypeListSaga(action) {
  const params = action.payload;
  try {
    const result = yield axios({
      method: "GET",
      url: "http://localhost:3005/types",
      params: {
        ...params,
      },
    });
    yield put({
      type: "GET_TYPE_LIST_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_TYPE_LIST_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}

export default function* productSaga() {
  yield takeEvery("GET_PRODUCT_LIST_REQUEST", getProductListSaga);
  yield takeEvery('GET_CATEGORY_LIST_REQUEST', getCategoryListSaga);
  yield takeEvery('GET_TYPE_LIST_REQUEST', getTypeListSaga);
}
