export const Types = {
  DELETE_PRODUCTS_REQUEST: "admin/DELETE_PRODUCTS_REQUEST",
  DELETE_PRODUCTS_SUCCESS: "admin/DELETE_PRODUCTS_SUCCESS",
  DELETE_PRODUCTS_FAILURE: "admin/DELETE_PRODUCTS_FAILURE",

  GET_GLOBAL_DATA_REQUEST: "admin/GET_GLOBAL_DATA_REQUEST",
  GET_GLOBAL_DATA_SUCCESS: "admin/GET_GLOBAL_DATA_SUCCESS",
  GET_GLOBAL_DATA_FAILURE: "admin/GET_GLOBAL_DATA_FAILURE",

  UPDATE_VAT_RATE_REQUEST: "admin/UPDATE_VAT_RATE_REQUEST",
  UPDATE_VAT_RATE_SUCCESS: "admin/UPDATE_VAT_RATE_SUCCESS",
  UPDATE_VAT_RATE_FAILURE: "admin/UPDATE_VAT_RATE_FAILURE",

  GET_ALL_PRODUCTS_REQUEST: "admin/GET_ALL_PRODUCTS_REQUEST",
  GET_ALL_PRODUCTS_SUCCESS: "admin/GET_ALL_PRODUCTS_SUCCESS",
  GET_ALL_PRODUCTS_FAILURE: "admin/GET_ALL_PRODUCTS_FAILURE",

  GET_ORDERS_BY_DATE_REQUEST: "admin/GET_ORDERS_BY_DATE_REQUEST",
  GET_ORDERS_BY_DATE_SUCCESS: "admin/GET_ORDERS_BY_DATE_SUCCESS",
  GET_ORDERS_BY_DATE_FAILURE: "admin/GET_ORDERS_BY_DATE_FAILURE",

  GET_ALL_ORDERS_REQUEST: "admin/GET_ALL_ORDERS_REQUEST",
  GET_ALL_ORDERS_SUCCESS: "admin/GET_ALL_ORDERS_SUCCESS",
  GET_ALL_ORDERS_FAILURE: "admin/GET_ALL_ORDERS_FAILURE",

  GET_ORDERS_BY_USER_NAME_REQUEST: "admin/GET_ORDERS_BY_USER_NAME_REQUEST",
  GET_ORDERS_BY_USER_NAME_SUCCESS: "admin/GET_ORDERS_BY_USER_NAME_SUCCESS",
  GET_ORDERS_BY_USER_NAME_FAILURE: "admin/GET_ORDERS_BY_USER_NAME_FAILURE",

  CHANGE_PRODUCT_STATUS_START: "admin/CHANGE_PRODUCT_STATUS_START",
  CHANGE_PRODUCT_STATUS_SUCCESS: "admin/CHANGE_PRODUCT_STATUS_SUCCESS",
  CHANGE_PRODUCT_STATUS_FAILURE: "admin/CHANGE_PRODUCT_STATUS_FAILURE",
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

export const getOrdersByDateRequest = ({
  token,
  adminId,
  fromSelectedDate,
  ToSelectedDate,
}) => ({
  type: Types.GET_ORDERS_BY_DATE_REQUEST,
  payload: {
    token,
    adminId,
    fromSelectedDate,
    ToSelectedDate,
  },
});

export const getOrdersByDateSuccess = (orders) => ({
  type: Types.GET_ORDERS_BY_DATE_SUCCESS,
  payload: {
    orders,
  },
});

export const getOrdersByDateFailure = (error) => ({
  type: Types.GET_ORDERS_BY_DATE_FAILURE,
  payload: {
    error,
  },
});

export const DeleteProductsRequest = ({ selectedItems, adminId, token }) => ({
  type: Types.DELETE_PRODUCTS_REQUEST,
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

export const getAllProductsRequest = ({ adminId, token }) => ({
  type: Types.GET_ALL_PRODUCTS_REQUEST,
  payload: {
    adminId,
    token,
  },
});

export const getAllProductsSuccess = ({ products }) => ({
  type: Types.GET_ALL_PRODUCTS_SUCCESS,
  payload: {
    products,
  },
});

export const getAllProductsFailure = (error) => ({
  type: Types.GET_ALL_PRODUCTS_FAILURE,
  payload: {
    error,
  },
});

export const changeStatusStart = ({ adminId, token, productId }) => ({
  type: Types.CHANGE_PRODUCT_STATUS_START,
  payload: {
    adminId,
    token,
    productId,
  },
});

export const changeStatusSuccess = (item) => ({
  type: Types.CHANGE_PRODUCT_STATUS_SUCCESS,
  payload: {
    item,
  },
});

export const changeStatusFailure = (error) => ({
  type: Types.CHANGE_PRODUCT_STATUS_FAILURE,
  payload: {
    error,
  },
});

export const getOrdersByUserNameRequest = ({ adminId, token, userName }) => ({
  type: Types.GET_ORDERS_BY_USER_NAME_REQUEST,
  payload: {
    adminId,
    token,
    userName,
  },
});

export const getOrdersByUserNameSuccess = (items) => ({
  type: Types.GET_ORDERS_BY_USER_NAME_SUCCESS,
  payload: {
    items,
  },
});

export const getOrdersByUserNameFailure = (error) => ({
  type: Types.GET_ORDERS_BY_USER_NAME_FAILURE,
  payload: {
    error,
  },
});

export const getOrdersRequest = ({ adminId, token }) => ({
  type: Types.GET_ALL_ORDERS_REQUEST,
  payload: {
    adminId,
    token,
  },
});

export const getOrdersSuccess = (orders) => ({
  type: Types.GET_ALL_ORDERS_SUCCESS,
  payload: {
    orders,
  },
});

export const getOrdersFailure = (error) => ({
  type: Types.GET_ALL_ORDERS_FAILURE,
  payload: {
    error,
  },
});
