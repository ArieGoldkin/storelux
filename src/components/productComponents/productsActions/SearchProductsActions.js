export const Types = {
  FIND_PRODUCTS_BY_TITLE_REQUEST: "products/FIND_PRODUCTS_BY_TITLE_REQUEST",
  FIND_PRODUCTS_BY_TITLE_SUCCESS: "products/FIND_PRODUCTS_BY_TITLE_SUCCESS",
  FIND_PRODUCTS_BY_TITLE_FAILURE: "products/FIND_PRODUCTS_BY_TITLE_FAILURE",
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
