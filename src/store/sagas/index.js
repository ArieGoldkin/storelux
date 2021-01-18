import {
  takeLatest,
  takeEvery,
  all,
  fork,
  take,
  call,
} from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";

import {
  signUpUser,
  loginUser,
  logoutUser,
  checkAuthTimeSaga,
  authCheckStateSaga,
} from "./user/auth";

import { resetPassword, updatePassword } from "./user/resetPassword";
import {
  getUserMessages,
  userMessageSeen,
  deleteMessageRequest,
} from "./user/userMessages";

import {
  getUsers,
  getUserData,
  updateUser,
  getUserOrders,
  getOrdersByDate,
  getSoldItems,
} from "./user/user";

import {
  getCartByUserId,
  updateProductInCart,
  deleteProductCart,
  addProductToCartRequest,
} from "./shoppingCart/cart";

import {
  getProducts,
  createProduct,
  updateProduct,
  getProductRequest,
  getUserProducts,
  deleteProductRequest,
  getProductsByTitle,
  getProductsByCategory,
} from "./products/products";

import {
  setOrder,
  addNewOrder,
  deleteFromCart,
  deleteProductsFromCart,
} from "./order/order";

import { getCategoriesRequest } from "./categories/categories";

import { AddNewCategory } from "./admin/categories";
import { getGlobalData } from "./admin/globalData";
import { updateRate } from "./admin/rateChange";
import { deleteProducts, getAllProducts } from "./admin/products";
import {
  getAdminOrdersByDate,
  getOrdersByUserName,
  getOrders,
} from "./admin/orders";
import { changeProductStatus } from "./admin/changeStatus";

function* watchAuth() {
  yield all([
    takeLatest(actionTypes.USER_AUTH_START, signUpUser),
    takeLatest(actionTypes.USER_LOGIN_START, loginUser),
    takeLatest(actionTypes.USER_AUTH_INITIATE_LOGOUT, logoutUser),
    takeLatest(actionTypes.USER_AUTH_CHECK_TIMEOUT, checkAuthTimeSaga),
    takeLatest(actionTypes.USER_AUTH_CHECK_STATE, authCheckStateSaga),
  ]);
}

function* watchResetPassword() {
  yield all([
    takeLatest(actionTypes.RESET_PASSWORD_REQUEST, resetPassword),
    takeLatest(actionTypes.NEW_PASSWORD_UPDATE_REQUEST, updatePassword),
  ]);
}

function* watchUserMessages() {
  yield all([
    takeLatest(actionTypes.USER_MESSAGES_REQUEST, getUserMessages),
    takeLatest(actionTypes.USER_SEEN_MESSAGE_REQUEST, userMessageSeen),
  ]);
}

function* watchDeleteMessage() {
  while (true) {
    const deleteAction = yield take(actionTypes.DELETE_MESSAGE_REQUEST);
    yield call(deleteMessageRequest, {
      token: deleteAction.payload.token,
      messageId: deleteAction.payload.messageId,
    });
  }
}

function* watchUser() {
  yield all([
    takeLatest(actionTypes.GET_USERS_REQUEST, getUsers),
    takeLatest(actionTypes.USER_PROFILE_REQUEST, getUserData),
    takeLatest(actionTypes.USER_UPDATE_REQUEST, updateUser),
    takeLatest(actionTypes.GET_USER_ORDERS_REQUEST, getUserOrders),
    takeLatest(actionTypes.USER_ORDERS_BY_DATE_REQUEST, getOrdersByDate),
    takeLatest(actionTypes.GET_USER_SOLD_ITEMS_REQUEST, getSoldItems),
  ]);
}

function* watchCart() {
  yield all([
    takeLatest(actionTypes.GET_CART_REQUEST, getCartByUserId),
    takeLatest(actionTypes.SET_PRODUCT_QUANTITY_REQUEST, updateProductInCart),
    takeLatest(actionTypes.ADD_TO_CART_REQUEST, addProductToCartRequest),
  ]);
}

function* watchDeleteProductFromCart() {
  while (true) {
    const deleteAction = yield take(actionTypes.DELETE_FROM_CART_REQUEST);
    yield call(deleteProductCart, {
      token: deleteAction.token,
      userId: deleteAction.userId,
      productId: deleteAction.productId,
      vatRate: deleteAction.vatRate,
    });
  }
}
function* watchProducts() {
  yield all([
    takeLatest(actionTypes.GET_PRODUCTS_REQUEST, getProducts),
    takeLatest(actionTypes.CREATE_PRODUCT_REQUEST, createProduct),
    takeLatest(actionTypes.UPDATE_PRODUCT_REQUEST, updateProduct),
    takeLatest(actionTypes.GET_PRODUCT_REQUEST, getProductRequest),
    takeLatest(actionTypes.GET_USER_PRODUCTS_REQUEST, getUserProducts),
    takeLatest(actionTypes.FIND_PRODUCTS_BY_TITLE_REQUEST, getProductsByTitle),
    takeLatest(
      actionTypes.FIND_PRODUCT_BY_CATEGORY_REQUEST,
      getProductsByCategory
    ),
  ]);
}

function* watchDeleteProductRequest() {
  while (true) {
    const deleteAction = yield take(actionTypes.DELETE_PRODUCT_REQUEST);
    yield call(deleteProductRequest, {
      token: deleteAction.token,
      productId: deleteAction.productId,
      userId: deleteAction.userId,
    });
  }
}

function* watchOrder() {
  yield all([
    takeLatest(actionTypes.SET_ORDER_REQUEST, setOrder),
    takeLatest(actionTypes.ADD_ORDER_REQUEST, addNewOrder),
  ]);
}

function* watchDeleteFromCartAfterSuccess() {
  while (true) {
    const deleteAction = yield take(actionTypes.REMOVE_ITEMS_FROM_CART_REQUEST);
    console.log(deleteAction);
    yield call(deleteFromCart, {
      token: deleteAction.token,
      userId: deleteAction.userId,
      product: deleteAction.product,
    });
  }
}

function* watchDeleteProductsFromCartRequest() {
  while (true) {
    const deleteAction = yield take(
      actionTypes.REMOVE_PRODUCTS_FROM_CART_REQUEST
    );
    console.log(deleteAction);
    yield call(deleteProductsFromCart, {
      token: deleteAction.token,
      userId: deleteAction.userId,
      products: deleteAction.products,
    });
  }
}

function* watchCategories() {
  yield all([
    takeLatest(actionTypes.GET_CATEGORIES_REQUEST, getCategoriesRequest),
  ]);
}

function* watchAdminSagas() {
  yield all([
    takeLatest(actionTypes.ADD_CATEGORY_REQUEST, AddNewCategory),
    takeLatest(actionTypes.GET_GLOBAL_DATA_REQUEST, getGlobalData),
    takeLatest(actionTypes.UPDATE_VAT_RATE_REQUEST, updateRate),
    takeLatest(actionTypes.GET_ORDERS_BY_DATE_REQUEST, getAdminOrdersByDate),
    takeLatest(actionTypes.GET_ALL_PRODUCTS_REQUEST, getAllProducts),
    takeEvery(actionTypes.CHANGE_PRODUCT_STATUS_START, changeProductStatus),
    takeLatest(
      actionTypes.GET_ORDERS_BY_USER_NAME_REQUEST,
      getOrdersByUserName
    ),
    takeLatest(actionTypes.GET_ALL_ORDERS_REQUEST, getOrders),
  ]);
}
function* watchAdminDeleteProducts() {
  while (true) {
    const deleteAction = yield take(actionTypes.DELETE_PRODUCTS_REQUEST);
    console.log(deleteAction);
    yield call(deleteProducts, {
      products: deleteAction.selectedItems,
      adminId: deleteAction.adminId,
      token: deleteAction.token,
    });
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchAuth),
    fork(watchResetPassword),
    fork(watchUserMessages),
    fork(watchDeleteMessage),
    fork(watchUser),
    fork(watchCart),
    fork(watchDeleteProductFromCart),
    fork(watchProducts),
    fork(watchDeleteProductRequest),
    fork(watchOrder),
    fork(watchDeleteFromCartAfterSuccess),
    fork(watchDeleteProductsFromCartRequest),
    fork(watchCategories),
    fork(watchAdminSagas),
    fork(watchAdminDeleteProducts),
  ]);
}
