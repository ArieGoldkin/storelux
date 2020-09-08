import { takeLatest, call, put, fork, take } from "redux-saga/effects";
import * as api from "../../api/ordersApi";
import * as cartApi from "../../api/cartApi";
import * as cartActions from "../../shoppingCartComponents/shoppingCartActions/ShoppingCartActions";
import * as actions from "../orderActions/OrderActions";
import { toast } from "react-toastify";

function* setOrder(action) {
  console.log(action);
  try {
    yield put(actions.setOrderSuccess(action.items));
    console.log(action);
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
      product: action.product,
      orderSummary: action.orderSummary,
    });
    yield put(actions.addOrderSuccess(responseData.data.order));
    yield toast.info("Order was successfuly send.");
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

// function* getCartAfterOrder(action) {
//   try {
//     const responseData = yield call(cartApi.getCartByUserId, {
//       userId: action.userId,
//       token: action.token,
//     });
//     yield put(cartActions.getCartSuccess(responseData.data.cart));
//     console.log(responseData);
//   } catch (e) {
//     yield put(
//       cartActions.getCartFailure({
//         error:
//           "An error happend, Could't get cart from server, please try again.",
//       })
//     );
//   }
// }

function* deleteFromCart({ token, userId, productId }) {
  try {
    //delete in porgrass make some logic befor delete

    yield call(cartApi.deleteProductFromCart, token, userId, productId);
    yield put(actions.DeleteFromCartAfterOrderSuccess(productId));
    yield put(cartActions.getCartRequest(userId, token));
    // yield call(getCartAfterOrder, { userId, token });
    yield toast.info("Order removed successfuly from cart.");
  } catch (e) {
    yield put(
      actions.DeleteFromCartAfterOrderFaiulre({
        error: "COuld not delete product from cart, please try again.",
      })
    );
  }
}

function* watchDeleteFromCartAfterSuccess() {
  while (true) {
    const deleteAction = yield take(
      actions.Types.REMOVE_ITEMS_FROM_CART_REQUESET
    );
    yield call(deleteFromCart, {
      token: deleteAction.token,
      userId: deleteAction.userId,
      productId: deleteAction.productId,
    });
  }
}

const orderSagas = [
  fork(watchSetOrderRequest),
  fork(watchaddNewOrderRequest),
  fork(watchDeleteFromCartAfterSuccess),
];

export default orderSagas;
