import * as actionTypes from "../../actions/actionTypes";
import { updateObject } from "../../utility";

const initialState = {
  items: [],
  error: null,
  loading: true,
  itemLoading: false,
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
    loading: true,
    isDone: false,
  });
};
const deleteUserProductSuccess = (state, action) => {
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

const updateProductRequest = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const updateProductSuccess = (state, action) => {
  console.log(state);
  console.log(action);
  let updatedProductsArray = state.items.map((item) =>
    item.id === action.product.id ? action.product : item
  );
  return updateObject(state, {
    items: updatedProductsArray,
    loading: true,
    error: null,
  });
};

const changeWatchUserProducts = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const addToCartRequest = (state, action) => {
  return updateObject(state, {
    itemLoading: true,
  });
};

const addToCartSuccess = (state, action) => {
  return updateObject(state, {
    itemLoading: false,
  });
};

const addToCartFailure = (state, action) => {
  return updateObject(state, {
    itemLoading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_PRODUCTS_REQUEST:
      return getUserProductsDataStart(state, action);
    case actionTypes.GET_USER_PRODUCTS_SUCCESS:
      return getUserProductsDataSuccess(state, action);
    case actionTypes.GET_USER_PRODUCTS_FAILURE:
      return getUserProductsDataFailure(state, action);
    case actionTypes.USER_AUTH_LOGOUT:
      return onLogOutUser(state, action);
    case actionTypes.DELETE_PRODUCT_REQUEST:
      return addOrDeleteUserProductRequest(state, action);
    case actionTypes.DELETE_PRODUCT_SUCCESS:
      return deleteUserProductSuccess(state, action);
    case actionTypes.CREATE_PRODUCT_SUCCESS:
      return createUserProductSuccess(state, action);
    case actionTypes.GET_USERS_SUCCESS:
      return changingHasChangeAfterGetUsers(state, action);
    case actionTypes.DELETE_PRODUCT_FAILURE:
      return deleteUserProductError(state, action);
    case actionTypes.UPDATE_PRODUCT_REQUEST:
      return updateProductRequest(state, action);
    case actionTypes.UPDATE_PRODUCT_SUCCESS:
      return updateProductSuccess(state, action);
    case actionTypes.CHANGE_USER_PRODUCTS:
      return changeWatchUserProducts(state, action);
    case actionTypes.ADD_TO_CART_REQUEST:
      return addToCartRequest(state, action);
    case actionTypes.ADD_TO_CART_SUCCESS:
      return addToCartSuccess(state, action);
    case actionTypes.ADD_TO_CART_FAILURE:
      return addToCartFailure(state, action);
    default:
      return state;
  }
};

export default reducer;
