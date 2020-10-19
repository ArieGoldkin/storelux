import { Types } from "../usersActions/UserActions";
import { updateObject } from "../../store/utility";

const initialState = {
  item: [],
  error: null,
  loading: true,
  isDone: false,
  userOrders: {
    items: [],
    userOrdersLoading: true,
    ordersError: null,
  },
};

const getUserDataStart = (state, action) => {
  return updateObject(state, { error: null, loading: true, isDone: false });
};

const getUserDataSuccess = (state, action) => {
  return updateObject(state, {
    item: action.user,
    error: null,
    loading: false,
    isDone: true,
  });
};

const getUserDataFailure = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    isDone: true,
  });
};
const getOrdersRequest = (state, action) => {
  return updateObject(state, {
    userOrders: {
      userOrdersLoading: true,
    },
  });
};
const getOrdersSuccess = (state, action) => {
  return updateObject(state, {
    userOrders: {
      items: action.payload.items,
      userOrdersLoading: false,
      ordersError: null,
    },
  });
};

const getOrdersFailure = (state, action) => {
  return updateObject(state, {
    userOrders: {
      ordersError: action.payload.error,
      userOrdersLoading: false,
    },
  });
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case Types.USER_PROFILE_REQUEST:
      return getUserDataStart(state, action);
    case Types.USER_PROFILE_SUCCESS:
      return getUserDataSuccess(state, action);
    case Types.USER_PROFILE_FAILURE:
      return getUserDataFailure(state, action);
    case Types.USER_UPDATE_REQUEST:
      return getUserDataStart(state, action);
    case Types.USER_UPDATE_SUCCESS:
      return getUserDataSuccess(state, action);
    case Types.USER_UPDATE_FAILURE:
      return getUserDataFailure(state, action);
    case Types.GET_USER_ORDERS_REQUEST:
      return getOrdersRequest(state, action);
    case Types.GET_USER_ORDERS_SUCCESS:
      return getOrdersSuccess(state, action);
    case Types.GET_USER_ORDERS_FAILURE:
      return getOrdersFailure(state, action);
    default:
      return state;
  }
}
