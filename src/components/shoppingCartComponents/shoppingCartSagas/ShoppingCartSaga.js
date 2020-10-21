import { takeLatest, call, put, fork, take } from "redux-saga/effects";
import * as actions from "../shoppingCartActions/ShoppingCartActions";
import * as api from "../../api/cartApi";
import { calcSummary } from "../../common/util/calcTotalPrice";
import { toast } from "react-toastify";

function* getCartByUserId(action) {
  // console.log(action);
  try {
    const responseData = yield call(api.getCartByUserId, {
      userId: action.userId,
      token: action.token,
    });
    const cartData = yield responseData.data.cart;
    const cartSummary = yield calcSummary(cartData, action.vatRate);

    // console.log(cartData);
    // console.log(cartSummary);

    yield put(actions.getCartSuccess(responseData.data.cart, cartSummary));
  } catch (e) {
    yield put(
      actions.getCartFailure({
        error:
          "An error happened, Couldn't get cart from server, please try again.",
      })
    );
  }
}
function* watchGetCartRequest() {
  yield takeLatest(actions.Types.GET_CART_REQUEST, getCartByUserId);
}

function* updateProductInCart(action) {
  console.log(action.payload.vatRate);
  try {
    const responseData = yield call(api.updateProductQuantity, {
      userId: action.payload.userId,
      token: action.payload.token,
      productId: action.payload.productId,
      quantity: action.payload.quantity,
    });

    console.log(responseData.data.cart);
    const cartData = yield responseData.data.cart;
    const cartSummary = yield calcSummary(cartData, action.payload.vatRate);
    // console.log(cartSummary);

    yield put(actions.setProductQuantitySuccess(cartSummary));
  } catch (e) {
    yield put(
      actions.setProductQuantityFailure({
        error: "Could not update product, please try again.",
      })
    );
  }
}

function* watchUpdateProductCartRequest() {
  yield takeLatest(
    actions.Types.SET_PRODUCT_QUANTITY_REQUEST,
    updateProductInCart
  );
}

function* deleteProductCart({ token, userId, productId, vatRate }) {
  try {
    const responseData = yield call(
      api.deleteProductFromCart,
      token,
      userId,
      productId
    );
    console.log(responseData.data.cart);
    const cartData = yield responseData.data.cart;
    const newCartSummary = yield calcSummary(cartData, vatRate);
    yield put(actions.deleteProductFromCartSuccess(cartData,newCartSummary));

    yield toast.info("Product deleted successfully from cart.");
  } catch (e) {
    console.log(e.response.data.message);
    yield put(
      actions.deleteProductFromCartFailure({
        error: "Could not delete product from cart, please try again.",
      })
    );
  }
}

function* watchDeleteProductFromCartRequest() {
  while (true) {
    const deleteAction = yield take(actions.Types.DELETE_FROM_CART_REQUEST);
    yield call(deleteProductCart, {
      token: deleteAction.token,
      userId: deleteAction.userId,
      productId: deleteAction.productId,
      vatRate: deleteAction.vatRate,
    });
  }
}

const cartSagas = [
  fork(watchGetCartRequest),
  fork(watchUpdateProductCartRequest),
  fork(watchDeleteProductFromCartRequest),
];

export default cartSagas;
