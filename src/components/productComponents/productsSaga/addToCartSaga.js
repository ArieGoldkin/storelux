import { takeLatest, call, put, fork } from "redux-saga/effects";
import * as actions from "../productsActions/addToCartActions";
import * as api from "../../api/productsApi";
import { calcSummary } from "../../common/util/calcTotalPrice";
import { toast } from "react-toastify";

function* addProductToCartRequest(action) {
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
    yield put(
      actions.addToCartFailure({
        error: "Could not add product to cart, please try again",
      })
    );
  }
}

function* watchAddToCartRequest() {
  yield takeLatest(actions.Types.ADD_TO_CART_REQUEST, addProductToCartRequest);
}

const addTocartSagas = [fork(watchAddToCartRequest)];

export default addTocartSagas;
