import { Types } from "../productsActions/productsActions";
import { Types as authTypes } from "../../userComponents/usersActions/authActions";
import { Types as userTypes } from "../../userComponents/usersActions/UserActions";
import { updateObject } from "../../store/utility";

const initialState = {
  items: [],
  error: null,
  loading: true,
  isDone: false,
  hasChanged: false,
};

const getUserProductsDataStart = (state, action) => {
  return updateObject(state, { error: null, loading: true, isDone: false });
};

const getUserProductsDataSuccess = (state, action) => {
  return updateObject(state, {
    items: action.userProducts.items,
    error: null,
    loading: false,
    isDone: true,
  });
};

const getUserProductsDataFailure = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    isDone: true,
  });
};

const onLogOutUser = (state, action) => {
  return updateObject(state, {
    items: [],
    error: null,
    loading: false,
    isDone: false,
  });
};
const deleteUserProductSuccess = (state, action) => {
  console.log(state);
  console.log(action);
  debugger;
  return updateObject(state, {
    items: state.items.filter((item) => {
      return !action.productId.includes(item.id);
    }),
    loading: false,
    isDone: true,
  });
};

const deleteUserProductError = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    isDone: true,
  });
};
const createUserProductSuccess = (state, action) => {
  console.log(action);
  debugger;
  return updateObject(state, {
    items: state.items.concat(action.product),
    loading: false,
    hasChanged: true,
  });
};

const addOrDeleteUserProductRequest = (state, action) => {
  return updateObject(state, {
    loading: true,
    hasChanged: true,
  });
};

const changingHasChangeAfterGetUsers = (state, action) => {
  return updateObject(state, {
    hasChanged: false,
  });
};

export default function userProductsReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_USER_PRODUCTS_REQUEST:
      return getUserProductsDataStart(state, action);
    case Types.GET_USER_PRODUCTS_SUCCESS:
      return getUserProductsDataSuccess(state, action);
    case Types.GET_USER_PRODUCTS_FAILURE:
      return getUserProductsDataFailure(state, action);
    case authTypes.USER_AUTH_LOGOUT:
      return onLogOutUser(state, action);
    case Types.DELETE_PRODUCT_REQUEST:
      return addOrDeleteUserProductRequest(state, action);
    case Types.DELETE_PRODUCT_SUCCESS:
      return deleteUserProductSuccess(state, action);
    case Types.CREATE_PRODUCT_SUCCESS:
      return createUserProductSuccess(state, action);
    case userTypes.GET_USERS_SUCCESS:
      return changingHasChangeAfterGetUsers(state, action);
    case Types.DELETE_PRODUCT_FAILURE:
      return deleteUserProductError(state, action);
    default:
      return state;
  }
}
