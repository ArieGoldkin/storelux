import * as actionTypes from "../actionTypes";

export const getCategoriesRequest = () => ({
  type: actionTypes.GET_CATEGORIES_REQUEST,
});

export const getCategoriesSuccess = (items) => ({
  type: actionTypes.GET_CATEGORIES_SUCCESS,
  categories: items,
});

export const getCategoriesFailure = (error) => ({
  type: actionTypes.GET_CATEGORIES_FAILURE,
  error: error,
});

export const clearCategoriesFailure = () => {
  return {
    type: actionTypes.CLEAR_CATEGORIES_FAILURE,
  };
};
