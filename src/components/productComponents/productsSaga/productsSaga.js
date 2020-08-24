import { takeLatest, call, put, fork, take } from "redux-saga/effects";
import * as actions from "../productsActions/productsActions";
import * as api from "../../api/productsApi";

function* getProducts() {
  try {
    const result = yield call(api.getProducts);
    yield put(
      actions.getProductsSuccess({
        items: result.data.products,
      })
    );
    console.log(result);
  } catch (e) {
    yield put(
      actions.productError({
        error: "An error happend when trying to get Products",
      })
    );
  }
}

function* watchGetProductsRequest() {
  yield takeLatest(actions.Types.GET_PRODUCTS_REQUEST, getProducts);
}

function* createProduct(action) {
  try {
    const responseData = yield call(api.createProduct, {
      token: action.token,
      formData: action.formData,
    });
    yield put(actions.createProductSuccess(responseData.data.product));
    console.log(responseData);
  } catch (e) {
    yield put(
      actions.createProductFailure({
        error: "An error happend when tring to add new product",
      })
    );
  }
}

function* watchCreateProductRequest() {
  yield takeLatest(actions.Types.CREATE_PRODUCT_REQUEST, createProduct);
}

function* updateProduct(action) {
  try {
    const responseData = yield call(api.updateProduct, {
      token: action.token,
      productId: action.productId,
      formData: action.formData,
    });
    yield put(actions.updateProductSuccess(responseData.data.product));
    console.log(responseData);
  } catch (e) {
    yield put(
      actions.updateProductFailure({
        error:
          "Could not update the requested product, please check connection and try again.",
      })
    );
  }
}

function* watchUpdateProductRequest() {
  yield takeLatest(actions.Types.UPDATE_PRODUCT_REQUEST, updateProduct);
}

function* getProductRequest(action) {
  try {
    const responseData = yield call(api.getProductById, {
      productId: action.productId,
    });
    yield put(actions.getProductSuccess(responseData.data.product));
    console.log(responseData);
  } catch (e) {
    yield put(
      actions.getProductFailure({
        error: "Could not get the requested product, Please try again",
      })
    );
  }
}

function* watchGetProductRequest() {
  yield takeLatest(actions.Types.GET_PRODUCT_REQUEST, getProductRequest);
}

function* getUserProducts(action) {
  try {
    const responseData = yield call(api.getUserProducts, {
      userId: action.userId,
    });
    yield put(
      actions.getUserProductsSuccess({
        items: responseData.data.products,
      })
    );
    console.log(responseData);
  } catch (e) {
    yield put(
      actions.getUserProductsFailure({
        error: "Could not get users products, Please try again.",
      })
    );
  }
}

function* watchGetUserProductsRequest() {
  yield takeLatest(actions.Types.GET_USER_PRODUCTS_REQUEST, getUserProducts);
}

function* deleteProductRequest({ token, productId, userId }) {
  try {
    yield call(api.deleteProduct, token, productId);
    yield put(actions.deleteProductSuccess(productId));

    yield call(getUserProducts, { userId });
  } catch (e) {
    yield put(
      actions.deleteProductFailure({
        error: "Could not Delete products, Please try again.",
      })
    );
  }
}

function* watchDeleteProductRequest() {
  while (true) {
    const deleteAction = yield take(actions.Types.DELETE_PRODUCT_REQUEST);
    yield call(deleteProductRequest, {
      token: deleteAction.token,
      productId: deleteAction.productId,
      userId: deleteAction.userId,
    });
  }
}

const productsSagas = [
  fork(watchGetProductsRequest),
  fork(watchCreateProductRequest),
  fork(watchGetUserProductsRequest),
  fork(watchDeleteProductRequest),
  fork(watchGetProductRequest),
  fork(watchUpdateProductRequest),
];

export default productsSagas;
