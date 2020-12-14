import * as actionTypes from "../actionTypes";

export const searchProductsByTitleRequest = (title) => ({
  type: actionTypes.FIND_PRODUCTS_BY_TITLE_REQUEST,
  payload: {
    title,
  },
});

export const searchProductsByTitleSuccess = (items) => ({
  type: actionTypes.FIND_PRODUCTS_BY_TITLE_SUCCESS,
  payload: {
    items,
  },
});

export const searchProductsByTitleFailure = (error) => ({
  type: actionTypes.FIND_PRODUCTS_BY_TITLE_FAILURE,
  payload: {
    error,
  },
});

export const onChangeCategorySearch = () => ({
  type: actionTypes.ON_CHANGE_CATEGORY_SEARCH,
});

export const searchProductsByCategoryRequest = (category) => ({
  type: actionTypes.FIND_PRODUCT_BY_CATEGORY_REQUEST,
  payload: {
    category,
  },
});

export const searchProductsByCategorySuccess = (items) => ({
  type: actionTypes.FIND_PRODUCT_BY_CATEGORY_SUCCESS,
  payload: {
    items,
  },
});

export const searchProductsByCategoryFailure = (error) => ({
  type: actionTypes.FIND_PRODUCT_BY_CATEGORY_FAILURE,
  payload: {
    error,
  },
});