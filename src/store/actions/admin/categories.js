import * as actionTypes from "../actionTypes";

export const addCategoryRequest = (item, adminId, token) => ({
  type: actionTypes.ADD_CATEGORY_REQUEST,
  category: item,
  adminId: adminId,
  token: token,
});

export const addCategorySuccess = (item) => ({
  type: actionTypes.ADD_CATEGORY_SUCCESS,
  category: item.category,
});

export const addCategoryFailure = (error) => ({
  type: actionTypes.ADD_CATEGORY_FAILURE,
  error: error,
});
