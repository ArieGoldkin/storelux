export const getOrderSummaryLoading = (state) =>
  state.order.orderSummary.loading;

export const getOrderSummary = (state) => state.order.orderSummary;

export const getOrderLoading = (state) => state.order.loading;

export const getOrderError = (state) => state.order.error;

export const getOrderRedirect = (state) => state.order.canRedirect;

export const getOrderCanRemove = (state) => state.order.canRemove;

export const getOrderRedirectPath = (state) => state.order.orderRedirect;

export const getOrderIsDone = (state) => state.order.isDone;

export const getOrderItems = (state) => state.order.items;

export const getOrderIsSet = (state) => state.order.isSet;
