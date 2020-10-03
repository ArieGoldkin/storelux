import { takeLatest, call, put, fork } from "redux-saga/effects";
import * as actions from "../productsActions/addToCartActions";
import * as api from "../../api/productsApi";
import { toast } from "react-toastify";

function* addProductToCartRequest(action) {
  try {
    const responseData = yield call(api.addProductToCart, {
      token: action.payload.token,
      userId: action.payload.userId,
      productId: action.payload.productId,
      quantity: action.payload.quantity,
      title: action.payload.title,
      category: action.payload.category,
      price: action.payload.price,
      units: action.payload.units,
      description: action.payload.description,
      image: action.payload.image,
    });
    yield put(actions.addToCartSuccess(responseData.data));

    yield toast.info("Product added successfully to cart.");
    console.log(responseData.data);
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
