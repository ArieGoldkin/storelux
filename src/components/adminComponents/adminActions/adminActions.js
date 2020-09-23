export const Types = {
  DELETE_PRODUCTS_REQUESET: "admin/DELETE_PRODUCTS_REQUESET",
  DELETE_PRODUCTS_SUCCESS: "admin/DELETE_PRODUCTS_SUCCESS",
  DELETE_PRODUCTS_FAILURE: "admin/DELETE_PRODUCTS_FAILURE",
};

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
