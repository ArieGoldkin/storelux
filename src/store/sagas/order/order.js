import { call, put, take } from "redux-saga/effects";
import * as actions from "../../actions";
import * as actionTypes from "../../actions/actionTypes";
import * as api from "../../../api";

import { calcSummary } from "../../../components/common/util/calcTotalPrice";
import { toast } from "react-toastify";

export function* setOrder(action) {
  try {
    const orderSummary = yield calcSummary(
      action.payload.items,
      action.payload.vatRate
    );
    yield put(actions.setOrderSuccess(action.payload.items, orderSummary));
  } catch (e) {
    yield put(
      actions.setOrderFailure({
        error: "Could not set order request, please try again.",
      })
    );
  }
}

export function* addNewOrder(action) {
  try {
    const responseData = yield call(api.addOrder, {
      userId: action.userId,
      token: action.token,
      firstName: action.firstName,
      email: action.email,
      address: action.address,
      phone: action.phone,
      items: action.products,
      orderSummary: action.orderSummary,
    });
    yield put(actions.addOrderSuccess(responseData.data.order));
    yield toast.info("Order was successfully send.");
    console.log(responseData);
  } catch (e) {
    yield put(
      actions.addOrderFailure({
        error: e.response.data.message,
      })
    );
  }
}

export function* deleteFromCart({ token, userId, product }) {
  let productId = product.id;
  try {
    yield call(api.deleteProductFromCart, token, userId, productId);
    yield put(actions.DeleteFromCartAfterOrderSuccess(productId));
    yield take(actionTypes.GET_CART_REQUEST);
    yield toast.info("Order removed successfully from cart.");
  } catch (e) {
    yield put(
      actions.DeleteFromCartAfterOrderFailure({
        error: "Could not delete product from cart, please try again.",
      })
    );
  }
}

export function* deleteProductsFromCart({ token, userId, products }) {
  try {
    yield call(api.deleteAllProductsFromCart, token, userId, products);
    yield put(actions.DeleteFromCartAfterOrderSuccess(products));
    yield take(actionTypes.GET_CART_REQUEST);
    yield toast.info("Order removed successfully from cart.");
  } catch (e) {
    yield put(
      actions.DeleteFromCartAfterOrderFailure({
        error: "Could not delete product from cart, please try again.",
      })
    );
  }
}
