import * as actionTypes from "../../actions/actionTypes";
//import { Types as adminActions } from "../../adminComponents/adminActions/adminActions";
import { updateObject } from "../../utility";

const initialState = {
  items: [], //users
  error: null,
  loading: true,
  isDone: false,
};

const requestUsersStart = (state, action) => {
  return updateObject(state, { error: null, loading: true, isDone: false });
};

const requestUsersSuccess = (state, action) => {
  return updateObject(state, {
    items: action.users.items,
    error: null,
    loading: false,
    isDone: true,
  });
};

const getUsersFailure = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    isDone: true,
  });
};

const changeProductStatus = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const clearErrorMessage = (state, action) => {
  return updateObject(state, {
    error: null,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USERS_REQUEST:
      return requestUsersStart(state, action);
    case actionTypes.GET_USERS_SUCCESS:
      return requestUsersSuccess(state, action);
    case actionTypes.GET_USERS_FAILURE:
      return getUsersFailure(state, action);
    case actionTypes.CHANGE_PRODUCT_STATUS_SUCCESS:
      return changeProductStatus(state, action);
    case actionTypes.CLEAR_USER_ERROR_MESSAGE:
      return clearErrorMessage(state, action);
    default:
      return state;
  }
};

export default reducer;
