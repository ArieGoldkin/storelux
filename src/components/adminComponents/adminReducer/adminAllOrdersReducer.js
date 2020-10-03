import { Types } from "../adminActions/adminActions";
import { updateObject } from "../../store/utility";

const initialState = {
  items: [],
  error: null,
  loading: true,
  isDone: false,
};

const getOrdersRequest = (state, action) => {
  return updateObject(state, {
    loading: true,
    isDone: false,
  });
};

const getOrdersSuccess = (state, action) => {
  return updateObject(state, {
    items: action.payload.orders,
    loading: false,
    error: null,
    isDone:true,
  });
};

const getOrdersFailure = (state, action) => {
  return updateObject(state, {
    error: action.payload.error,
    loading: false,
    isDone: true,
  });
};

export default function adminAllOrdersReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_ALL_ORDERS_REQUEST:
      return getOrdersRequest(state, action);
    case Types.GET_ALL_ORDERS_SUCCESS:
      return getOrdersSuccess(state, action);
    case Types.GET_GLOBAL_DATA_FAILURE:
      return getOrdersFailure(state, action);
    default:
      return state;
  }
}
