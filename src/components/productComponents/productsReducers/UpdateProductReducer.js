import { Types } from "../productsActions/productsActions";
import { updateObject } from "../../store/utility";

const initialState = {
  item: [],
  error: null,
  loading: true,
  isDone: false,
};

const productRequest = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    isDone: false,
  });
};

const productSuccess = (state, action) => {
  return updateObject(state, {
    item: action.product,
    error: null,
    loading: false,
    isDone: true,
  });
};

const productFailure = (state, action) => {
  return updateObject(state, {
    error: action.error.error,
    loading: false,
    isDone: true,
  });
};

const updateLoadingAfterSuccess = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

export default function updateProductReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_PRODUCT_REQUEST:
      return productRequest(state, action);
    case Types.GET_PRODUCT_SUCCESS:
      return productSuccess(state, action);
    case Types.GET_PRODUCT_FAILURE:
      return productFailure(state, action);
    case Types.UPDATE_PRODUCT_SUCCESS:
      return updateLoadingAfterSuccess(state, action);

    default:
      return state;
  }
}
