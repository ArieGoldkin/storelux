import { takeLatest, call, put, fork, take } from "redux-saga/effects";
import * as api from "../../api/ordersApi";
import * as cartApi from "../../api/cartApi";
import { calcProductOrderSummary } from "../../common/util/calcTotalPrice";
import * as cartActions from "../../shoppingCartComponents/shoppingCartActions/ShoppingCartActions";
import * as actions from "../orderActions/OrderActions";
import { toast } from "react-toastify";

function* setOrder(action) {
  console.log(action);
  try {
    const orderSummary = yield calcProductOrderSummary(
      action.payload.items,
      action.payload.vatRate
    );
    console.log(orderSummary);
    yield put(actions.setOrderSuccess(action.payload.items, orderSummary));
  } catch (e) {
    yield put(
      actions.setOrderFaiulre({
        error: "Could not set order request, pleaes try again.",
      })
    );
  }
}

function* watchSetOrderRequest() {
  yield takeLatest(actions.Types.SET_ORDER_REQUEST, setOrder);
}

function* addNewOrder(action) {
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
        error: "Could not add new order, please try again.",
      })
    );
  }
}
function* watchaddNewOrderRequest() {
  yield takeLatest(actions.Types.ADD_ORDER_REQUEST, addNewOrder);
}

function* deleteFromCart({ token, userId, product }) {
  let productId = product.id;
  try {
    yield call(cartApi.deleteProductFromCart, token, userId, productId);
    yield put(actions.DeleteFromCartAfterOrderSuccess(productId));
    yield take(cartActions.Types.GET_CART_REQUSET);
    yield toast.info("Order removed successfuly from cart.");
  } catch (e) {
    yield put(
      actions.DeleteFromCartAfterOrderFaiulre({
        error: "Could not delete product from cart, please try again.",
      })
    );
  }
}

function* watchDeleteFromCartAfterSuccess() {
  while (true) {
    const deleteAction = yield take(
      actions.Types.REMOVE_ITEMS_FROM_CART_REQUESET
    );
    console.log(deleteAction);
    yield call(deleteFromCart, {
      token: deleteAction.token,
      userId: deleteAction.userId,
      product: deleteAction.product,
    });
  }
}

function* deleteProductsFromCart({ token, userId, products }) {
  try {
    yield call(cartApi.deleteAllProductsFromCart, token, userId, products);
    yield put(actions.DeleteFromCartAfterOrderSuccess(products));
    yield take(cartActions.Types.GET_CART_REQUSET);
    yield toast.info("Order removed successfuly from cart.");
  } catch (e) {
    yield put(
      actions.DeleteFromCartAfterOrderFaiulre({
        error: "Could not delete product from cart, please try again.",
      })
    );
  }
}

function* watchDeleteProductsFromCartRequest() {
  while (true) {
    const deleteAction = yield take(
      actions.Types.REMOVE_PRODUCTS_FROM_CART_REQUEST
    );
    console.log(deleteAction);
    yield call(deleteProductsFromCart, {
      token: deleteAction.token,
      userId: deleteAction.userId,
      products: deleteAction.products,
    });
  }
}

const orderSagas = [
  fork(watchSetOrderRequest),
  fork(watchaddNewOrderRequest),
  fork(watchDeleteFromCartAfterSuccess),
  fork(watchDeleteProductsFromCartRequest),
];

export default orderSagas;
