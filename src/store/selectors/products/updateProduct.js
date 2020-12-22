export const getUpdateProduct = (state) => state.updateProduct.item;

export const getUpdateProductLoading = (state) => state.updateProduct.loading;

export const getUpdateProductError = (state) => state.updateProduct.error;

export const getUpdateProductRedirect = (state) =>
  state.updateProduct.canRedirect;
