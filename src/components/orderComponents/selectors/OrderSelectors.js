export const getOrderSummaryLoading = (state) =>
  state.order.orderSummary.loading;

export const getOrderSummary = (state) => state.order.orderSummary;

export const getOrderLoading = (state) => state.order.loading;

export const getOrderError = (state) => state.order.error;

export const getOrderRedirect = (state) => state.order.canRedirect;

export const getOrderCanRemove = (state) => state.order.canRemove;

export const getOrderRedirectPath = (state) => state.order.orderRedirect;
