export const Types = {
  GET_USER_SOLD_ITEMS_REQUEST: "user/GET_USER_SOLD_ITEMS_REQUEST",
  GET_USER_SOLD_ITEMS_SUCCESS: "user/GET_USER_SOLD_ITEMS_SUCCESS",
  GET_USER_SOLD_ITEMS_FAILURE: "user/GET_USER_SOLD_ITEMS_FAILURE",
};

export const getUserSoldItemsRequest = ({ token, userId }) => ({
  type: Types.GET_USER_SOLD_ITEMS_REQUEST,
  payload: {
    token,
    userId,
  },
});

export const getUserSoldItemsSuccess = (items) => ({
  type: Types.GET_USER_SOLD_ITEMS_SUCCESS,
  payload: {
    items,
  },
});

export const getUserSoldItemsFailure = (error) => ({
  type: Types.GET_USER_SOLD_ITEMS_FAILURE,
  payload: {
    error,
  },
});
