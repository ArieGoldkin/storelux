import { Types } from "../adminActions/adminActions";
import { updateObject } from "../../store/utility";

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

export default function adminAllOrdersReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_ALL_ORDERS_REQUEST:
      return getOrdersChartRequest(state, action);
    case Types.GET_ORDERS_BY_DATE_REQUEST:
    case Types.GET_ORDERS_BY_USER_NAME_REQUEST:
      return getOrdersRequest(state, action);
    case Types.GET_ALL_ORDERS_SUCCESS:
      return getOrdersChartSuccess(state, action);
    case Types.GET_ORDERS_BY_DATE_SUCCESS:
      return getOrdersSuccess(state, action);
    case Types.GET_ORDERS_BY_USER_NAME_SUCCESS:
      return getOrdersByUserNameSuccess(state, action);
    case Types.GET_GLOBAL_DATA_FAILURE:
    case Types.GET_ORDERS_BY_DATE_FAILURE:
    case Types.GET_ALL_ORDERS_FAILURE:
      return getOrdersFailure(state, action);
    case Types.GET_ORDERS_BY_USER_NAME_FAILURE:
      return getOrdersByUserNameFailure(state, action);
    default:
      return state;
  }
}
