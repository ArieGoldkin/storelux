export const Types = {
  GET_CATEGORIES_REQUEST: "categories/GET_CATEGORIES.REQUEST",
  GET_CATEGORIES_SUCCESS: "categories/GET_CATEGORIES.SUCCESS",
  GET_CATEGORIES_FAILURE: "categories/GET_CATEGORIES.FAILURE",

  ADD_CATEGORY_REQUEST: "categories/ADD_CATEGORY_REQUEST",
  ADD_CATEGORY_SUCCESS: "categories/ADD_CATEGORY_SUCCESS",
  ADD_CATEGORY_FAILURE: "categories/ADD_CATEGORY_FAILURE",
};

export const getCategoriesRequest = () => ({
  type: Types.GET_CATEGORIES_REQUEST,
});

export const getCategoriesSuccess = (items) => ({
  type: Types.GET_CATEGORIES_SUCCESS,
  categories: items,
});

export const getCategoriesFailure = (error) => ({
  type: Types.GET_CATEGORIES_FAILURE,
  error: error,
});

export const addCategoryRequest = (item, adminId, token) => ({
  type: Types.ADD_CATEGORY_REQUEST,
  category: item,
  adminId: adminId,
  token: token,
});

export const addCategorySuccess = (item) => ({
  type: Types.ADD_CATEGORY_SUCCESS,
  category: item.category,
});

export const addCategoryFailure = (error) => ({
  type: Types.ADD_CATEGORY_FAILURE,
  error: error,
});
