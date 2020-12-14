import { call, put } from "redux-saga/effects";
import * as api from "../../../api";
import { calcSummary } from "../../../components/common/util/calcTotalPrice";

import * as actions from "../../actions";
import { toast } from "react-toastify";

export function* getCartByUserId(action) {
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

export function* updateProductInCart(action) {
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

export function* deleteProductCart({ token, userId, productId, vatRate }) {
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
    yield put(actions.deleteProductFromCartSuccess(cartData, newCartSummary));

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

export function* addProductToCartRequest(action) {
  try {
    const responseData = yield call(api.addProductToCart, {
      token: action.payload.token,
      userId: action.payload.userId,
      quantity: action.payload.quantity,
      productId: action.payload.selectedProduct.productId,
      title: action.payload.selectedProduct.title,
      category: action.payload.selectedProduct.category,
      price: action.payload.selectedProduct.price,
      units: action.payload.selectedProduct.units,
      description: action.payload.selectedProduct.description,
      image: action.payload.selectedProduct.image,
    });
    const cartData = yield responseData.data.items;
    const cartSummary = yield calcSummary(cartData, action.payload.vatRate);
    yield put(actions.addToCartSuccess(responseData.data.items, cartSummary));
    yield toast.info("Product added successfully to cart.");
  } catch (e) {
    console.log(e.response.data);
    yield put(
      actions.addToCartFailure({
        error: e.response.data.message,
      })
    );
  }
}
