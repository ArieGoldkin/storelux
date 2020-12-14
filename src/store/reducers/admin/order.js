import * as actionTypes from "../../actions/actionTypes";
import { updateObject } from "../../utility";

const initialState = {
  items: [],
  error: null,
  loading: true,
  isDone: false,
  chartOrdersLoading: true,
};

const getOrdersRequest = (state, action) => {
  return updateObject(state, {
    loading: true,
    isDone: false,
  });
};

const getOrdersChartRequest = (state, action) => {
  return updateObject(state, {
    chartOrdersLoading: true,
    error: null,
  });
};

const getOrdersChartSuccess = (state, action) => {
  return updateObject(state, {
    items: action.payload.orders,
    chartOrdersLoading: false,
    error: null,
  });
};

const getOrdersSuccess = (state, action) => {
  return updateObject(state, {
    items: action.payload.orders,
    loading: false,
    error: null,
    isDone: true,
    chartOrdersLoading: true,
  });
};

const getOrdersFailure = (state, action) => {
  return updateObject(state, {
    error: action.payload.error,
    loading: false,
    isDone: true,
  });
};

const getOrdersByUserNameSuccess = (state, action) => {
  return updateObject(state, {
    items: action.payload.items,
    loading: false,
    error: null,
    isDone: true,
    chartOrdersLoading: true,
  });
};

const getOrdersByUserNameFailure = (state, action) => {
  return updateObject(state, {
    error: action.payload.error,
    loading: false,
    isDone: true,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_ORDERS_REQUEST:
      return getOrdersChartRequest(state, action);
    case actionTypes.GET_ORDERS_BY_DATE_REQUEST:
    case actionTypes.GET_ORDERS_BY_USER_NAME_REQUEST:
      return getOrdersRequest(state, action);
    case actionTypes.GET_ALL_ORDERS_SUCCESS:
      return getOrdersChartSuccess(state, action);
    case actionTypes.GET_ORDERS_BY_DATE_SUCCESS:
      return getOrdersSuccess(state, action);
    case actionTypes.GET_ORDERS_BY_USER_NAME_SUCCESS:
      return getOrdersByUserNameSuccess(state, action);
    case actionTypes.GET_GLOBAL_DATA_FAILURE:
    case actionTypes.GET_ORDERS_BY_DATE_FAILURE:
    case actionTypes.GET_ALL_ORDERS_FAILURE:
      return getOrdersFailure(state, action);
    case actionTypes.GET_ORDERS_BY_USER_NAME_FAILURE:
      return getOrdersByUserNameFailure(state, action);
    default:
      return state;
  }
};

export default reducer;
