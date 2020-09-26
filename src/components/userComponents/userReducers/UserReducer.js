// import produce from "immer";

import { Types } from "../usersActions/UserActions";
import { Types as productActions } from "../../productComponents/productsActions/productsActions";
import { updateObject } from "../../store/utility";


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

const onDeleteProductSuccess = (state, action) => {
  return updateObject(state, {
    isDone: false,
  });
};

const onCreateProductSuccess = (state, action) => {
  return updateObject(state, {
    isDone: true,
  });
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_USERS_REQUEST:
      return requestUsersStart(state, action);
    case Types.GET_USERS_SUCCESS:
      return requestUsersSuccess(state, action);
    case Types.GET_USERS_FAILURE:
      return getUsersFailure(state, action);
    case productActions.CREATE_PRODUCT_SUCCESS:
      return onCreateProductSuccess(state, action);
    case productActions.DELETE_PRODUCT_SUCCESS:
      return onDeleteProductSuccess(state, action);
    default:
      return state;
  }
}

// export const getUsersState = (state, isDone) => {
//   switch (isDone) {
//     case true:
//       return (state.isDone = true);
//     case false:
//       return (state.isDone = false);
//     default:
//       throw new Error(`Unknown isDone result.`);
//   }
// };
