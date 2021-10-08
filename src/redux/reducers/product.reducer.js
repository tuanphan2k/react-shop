const initialState = {
  productList: {
    data: [],
    totalRow: 0,
    load: false,
    error: "",
  },

  categoryList: {
    data: [],
    load: false,
    error: "",
  },

  typeList: {
    data: [],
    load: false,
    error: "",
  },
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_PRODUCT_LIST_REQUEST": {
      return {
        ...state,
        productList: {
          ...state.productList,
          load: true,
        },
      };
    }
    case "GET_PRODUCT_LIST_SUCCESS": {
      const { data, totalRow } = action.payload;
      return {
        ...state,
        productList: {
          ...state.productList,
          data,
          totalRow,
          load: false,
        },
      };
    }
    case "GET_PRODUCT_LIST_FAIL": {
      const { error } = action.payload;
      return {
        ...state,
        productList: {
          ...state.productList,
          error,
          load: false,
        },
      };
    }
    case "GET_CATEGORY_LIST_REQUEST": {
      return {
        ...state,
        categoryList: {
          ...state.categoryList,
        },
      };
    }
    case "GET_CATEGORY_LIST_SUCCESS": {
      const { data } = action.payload;
      return {
        ...state,
        categoryList: {
          ...state.categoryList,
          data,
          load: false,
        },
      };
    }
    case "GET_CATEGORY_LIST_FAIL": {
      const { error } = action.payload;
      return {
        ...state,
        categoryList: {
          ...state.categoryList,
          error,
          load: false,
        },
      };
    }
    case "GET_TYPE_LIST_REQUEST": {
      return {
        ...state,
        typeList: {
          ...state.typeList,
        },
      };
    }
    case "GET_TYPE_LIST_SUCCESS": {
      const { data } = action.payload;
      return {
        ...state,
        typeList: {
          ...state.typeList,
          data,
          load: false,
        },
      };
    }
    case "GET_TYPE_LIST_FAIL": {
      const { error } = action.payload;
      return {
        ...state,
        typeList: {
          ...state.typeList,
          error,
          load: false,
        },
      };
    }
    default: {
      return state;
    }
  }
}
