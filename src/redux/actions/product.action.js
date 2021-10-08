export function getProductListAction(params) {
  return {
    type: 'GET_PRODUCT_LIST_REQUEST',
    payload: params,
  }
}

export function getCategoryListAction(params) {
  return {
    type: 'GET_CATEGORY_LIST_REQUEST',
    payload: params,
  }
}

export function getTypeListAction(params) {
  return {
    type: 'GET_TYPE_LIST_REQUEST',
    payload: params,
  }
}