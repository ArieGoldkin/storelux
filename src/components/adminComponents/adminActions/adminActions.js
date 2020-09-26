export const Types = {
  DELETE_PRODUCTS_REQUESET: "admin/DELETE_PRODUCTS_REQUESET",
  DELETE_PRODUCTS_SUCCESS: "admin/DELETE_PRODUCTS_SUCCESS",
  DELETE_PRODUCTS_FAILURE: "admin/DELETE_PRODUCTS_FAILURE",

  GET_GLOBAL_DATA_REQUEST: "admin/GET_GLOBAL_DATA_REQUEST",
  GET_GLOBAL_DATA_SUCCESS: "admin/GET_GLOBAL_DATA_SUCCESS",
  GET_GLOBAL_DATA_FAILURE: "admin/GET_GLOBAL_DATA_FAILURE",

  UPDATE_VAT_RATE_REQUEST: "admin/UPDATE_VAT_RATE_REQUEST",
  UPDATE_VAT_RATE_SUCCESS: "admin/UPDATE_VAT_RATE_SUCCESS",
  UPDATE_VAT_RATE_FAILURE: "admin/UPDATE_VAT_RATE_FAILURE",
};

export const getGlobalDataRequest = (token) => ({
  type: Types.GET_GLOBAL_DATA_REQUEST,
  payload: {
    token: token,
  },
});

export const getGlobalDataSuccess = (data) => ({
  type: Types.GET_GLOBAL_DATA_SUCCESS,
  payload: {
    data: data,
  },
});

export const getGlobalDataFailure = (error) => ({
  type: Types.GET_GLOBAL_DATA_FAILURE,
  payload: {
    error: error,
  },
});

export const DeleteProductsRequest = ({ selectedItems, adminId, token }) => ({
  type: Types.DELETE_PRODUCTS_REQUESET,
  selectedItems,
  adminId,
  token,
});

export const DeleteProductsSuccess = (items) => ({
  type: Types.DELETE_PRODUCTS_SUCCESS,
  items: items,
});

export const DeleteProductsFailure = (error) => ({
  type: Types.DELETE_PRODUCTS_FAILURE,
  error: error,
});

export const getCurrentVatRate = (vatRate) => ({
  type: Types.SET_CURRENT_VAT_RATE,
  vatRate: vatRate,
});

export const updateRateRequest = ({ rate, adminId, token }) => ({
  type: Types.UPDATE_VAT_RATE_REQUEST,
  payload: {
    rate: rate,
    adminId: adminId,
    token: token,
  },
});

export const updateRateSuccess = (vatRate) => ({
  type: Types.UPDATE_VAT_RATE_SUCCESS,
  payload: {
    vatRate: vatRate,
  },
});

export const updateRateFailure = (error) => ({
  type: Types.UPDATE_VAT_RATE_FAILURE,
  payload: {
    error: error,
  },
});
