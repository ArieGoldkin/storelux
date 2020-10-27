export const Types = {
  FIND_PRODUCTS_BY_TITLE_REQUEST: "products/FIND_PRODUCTS_BY_TITLE_REQUEST",
  FIND_PRODUCTS_BY_TITLE_SUCCESS: "products/FIND_PRODUCTS_BY_TITLE_SUCCESS",
  FIND_PRODUCTS_BY_TITLE_FAILURE: "products/FIND_PRODUCTS_BY_TITLE_FAILURE",

  ON_CHANGE_CATEGORY_SEARCH: "products/ON_CHANGE_CATEGORY_SEARCH",

  FIND_PRODUCT_BY_CATEGORY_REQUEST: "products/FIND_PRODUCT_BY_CATEGORY_REQUEST",
  FIND_PRODUCT_BY_CATEGORY_SUCCESS: "products/FIND_PRODUCT_BY_CATEGORY_SUCCESS",
  FIND_PRODUCT_BY_CATEGORY_FAILURE: "products/FIND_PRODUCT_BY_CATEGORY_FAILURE",

  // SORT_BY_PRODUCT_TITLE: "search/SORT_BY_PRODUCT_TITLE",
  // SORT_BY_CATEGORY: "search/SORT_BY_CATEGORY",
  // SORT_BY_USER_NAME: "search/SORT_BY_USER_NAME",
  // SORT_BY_PRICE: "search/SORT_BY_PRICE",
};

export const searchProductsByTitleRequest = (title) => ({
  type: Types.FIND_PRODUCTS_BY_TITLE_REQUEST,
  payload: {
    title,
  },
});

export const searchProductsByTitleSuccess = (items) => ({
  type: Types.FIND_PRODUCTS_BY_TITLE_SUCCESS,
  payload: {
    items,
  },
});

export const searchProductsByTitleFailure = (error) => ({
  type: Types.FIND_PRODUCTS_BY_TITLE_FAILURE,
  payload: {
    error,
  },
});

export const onChangeCategorySearch = () => ({
  type: Types.ON_CHANGE_CATEGORY_SEARCH,
});

export const searchProductsByCategoryRequest = (category) => ({
  type: Types.FIND_PRODUCT_BY_CATEGORY_REQUEST,
  payload: {
    category,
  },
});

export const searchProductsByCategorySuccess = (items) => ({
  type: Types.FIND_PRODUCT_BY_CATEGORY_SUCCESS,
  payload: {
    items,
  },
});

export const searchProductsByCategoryFailure = (error) => ({
  type: Types.FIND_PRODUCT_BY_CATEGORY_FAILURE,
  payload: {
    error,
  },
});
