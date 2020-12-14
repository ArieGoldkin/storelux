import * as actionTypes from "../actionTypes";

export const DeleteProductsRequest = ({ selectedItems, adminId, token }) => ({
  type: actionTypes.DELETE_PRODUCTS_REQUEST,
  selectedItems,
  adminId,
  token,
});

export const DeleteProductsSuccess = (items) => ({
  type: actionTypes.DELETE_PRODUCTS_SUCCESS,
  items: items,
});

export const DeleteProductsFailure = (error) => ({
  type: actionTypes.DELETE_PRODUCTS_FAILURE,
  error: error,
});

export const getAllProductsRequest = ({ adminId, token }) => ({
  type: actionTypes.GET_ALL_PRODUCTS_REQUEST,
  payload: {
    adminId,
    token,
  },
});

export const getAllProductsSuccess = ({ products }) => ({
  type: actionTypes.GET_ALL_PRODUCTS_SUCCESS,
  payload: {
    products,
  },
});

export const getAllProductsFailure = (error) => ({
  type: actionTypes.GET_ALL_PRODUCTS_FAILURE,
  payload: {
    error,
  },
});
