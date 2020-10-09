import { Types } from "../adminActions/adminActions";
import { updateObject } from "../../store/utility";

const initialState = {
  items: [],
  error: null,
  loading: true,
  isDone: false,
  item: {
    statusLoading: true,
  },
};

const getProductsRequest = (state, action) => {
  return updateObject(state, {
    loading: true,
    isDone: false,
  });
};

const changeStatusStart = (state, action) => {
  return updateObject(state, {
    item: {
      statusLoading: true,
    },
  });
};

const getProductsSuccess = (state, action) => {
  return updateObject(state, {
    items: action.payload.products,
    loading: false,
    error: null,
    isDone: true,
  });
};

const changeStatusSuccess = (state, action) => {
  const index = state.items.findIndex(
    (item) => item.id === action.payload.item.id
  );
  const newArray = [...state.items];
  newArray[index].active = !newArray[index].active;
  return updateObject(state, {
    items: newArray,
    item: {
      statusLoading: false,
    },
  });
};

const changeStatusFailure = (state, action) => {
  return updateObject(state, {
    error: action.payload.error,
    loading: false,
    isDone: true,
  });
};

const getProductsFailure = (state, action) => {
  return updateObject(state, {
    error: action.payload.error,
    loading: false,
    isDone: true,
  });
};

//NEED TO MOVE THE DELETE METHODS FROM PRODUCTS REDUCER
export default function adminAllProductsReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_ALL_PRODUCTS_REQUEST:
      return getProductsRequest(state, action);
    case Types.GET_ALL_PRODUCTS_SUCCESS:
      return getProductsSuccess(state, action);
    case Types.GET_ALL_PRODUCTS_FAILURE:
      return getProductsFailure(state, action);
    case Types.CHANGE_PRODUCT_STATUS_START:
      return changeStatusStart(state, action);
    case Types.CHANGE_PRODUCT_STATUS_SUCCESS:
      return changeStatusSuccess(state, action);
    case Types.CHANGE_PRODUCT_STATUS_FAILURE:
      return changeStatusFailure(state, action);
    default:
      return state;
  }
}
