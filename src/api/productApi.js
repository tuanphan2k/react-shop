import axiosClient from "./axiosClient";

const productApi = {
  getProductList: (params, stringUrl) => {
    const url = `/products${stringUrl}`;
    return axiosClient.get(url, { params });
  },
  
  getCategoryList: (params) => {
    const url = `/categories`;
    return axiosClient.get(url, { params });
  },

  getTypeList: (params) => {
    const url = `/types`;
    return axiosClient.get(url, { params });
  },
}

export default productApi;