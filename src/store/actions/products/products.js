import * as actionTypes from "../actionTypes";

// get products actions
export const getProductsRequest = () => ({
  type: actionTypes.GET_PRODUCTS_REQUEST,
});

export const getProductsSuccess = (items) => {
  return {
    type: actionTypes.GET_PRODUCTS_SUCCESS,
    products: items,
  };
};

export const productError = (error) => ({
  type: actionTypes.GET_PRODUCTS_FAILURE,
  error: error,
});

export const createProductRequest = (token, formData) => ({
  type: actionTypes.CREATE_PRODUCT_REQUEST,
  token,
  formData,
});
export const createProductSuccess = (item) => ({
  type: actionTypes.CREATE_PRODUCT_SUCCESS,
  product: item,
});

export const createProductFailure = (error) => {
  return {
    type: actionTypes.CREATE_PRODUCT_FAILURE,
    error: error,
  };
};

export const clearAddProductFailure = () => {
  return {
    type: actionTypes.CLEAR_PRODUCT_FAILURE,
  };
};

export const getUserProductRequest = (userId) => ({
  type: actionTypes.GET_USER_PRODUCTS_REQUEST,
  userId: userId,
});

export const getUserProductsSuccess = (items) => ({
  type: actionTypes.GET_USER_PRODUCTS_SUCCESS,
  userProducts: items,
});

export const getUserProductsFailure = (error) => ({
  type: actionTypes.GET_USER_PRODUCTS_FAILURE,
  error: error,
});

export const deleteProductRequest = (token, productId, userId) => ({
  type: actionTypes.DELETE_PRODUCT_REQUEST,
  token,
  productId,
  userId,
});

export const deleteProductSuccess = (productId) => ({
  type: actionTypes.DELETE_PRODUCT_SUCCESS,
  productId: productId,
});

export const deleteProductFailure = (error) => ({
  type: actionTypes.DELETE_PRODUCT_FAILURE,
  error: error,
});

export const getProductRequest = (productId) => ({
  type: actionTypes.GET_PRODUCT_REQUEST,
  productId: productId,
});

export const getProductSuccess = (item) => ({
  type: actionTypes.GET_PRODUCT_SUCCESS,
  product: item,
});

export const getProductFailure = (error) => ({
  type: actionTypes.GET_PRODUCT_FAILURE,
  error: error,
});

export const updateProductRequest = (token, productId, formData) => ({
  type: actionTypes.UPDATE_PRODUCT_REQUEST,
  token,
  productId,
  formData,
});

export const updateProductSuccess = (item) => ({
  type: actionTypes.UPDATE_PRODUCT_SUCCESS,
  product: item,
});

export const updateProductFailure = (error) => ({
  type: actionTypes.UPDATE_PRODUCT_FAILURE,
  error: error,
});

export const clearUpdateProductFailure = () => {
  return {
    type: actionTypes.CLEAR_UPDATE_PRODUCT_FAILURE,
  };
};

export const onChangeSearchInput = () => ({
  type: actionTypes.ON_CHANGE_INPUT_SEARCH,
});
