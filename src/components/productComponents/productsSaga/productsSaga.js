import { takeLatest, call, put, fork, take } from "redux-saga/effects";
import * as actions from "../productsActions/productsActions";
import * as searchActions from "../productsActions/SearchProductsActions";
import * as api from "../../api/productsApi";
import { toast } from "react-toastify";

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
        error: "An error happened when trying to get Products",
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
    yield toast.info("Product successfully added.");
  } catch (e) {
    yield put(
      actions.createProductFailure({
        error: "An error happened when trying to add new product",
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
    yield toast.info("Product successfully removed.");
    debugger;
    // yield call(getUserProducts, { userId });
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

function* getProductsByTitle(action) {
  // console.log(action);
  // debugger;
  try {
    const responseData = yield call(api.findProductByTitle, {
      title: action.payload.title,
    });
    console.log(responseData.data);
    yield put(
      searchActions.searchProductsByTitleSuccess(responseData.data.products)
    );
  } catch (e) {
    yield put(
      searchActions.searchProductsByTitleFailure({
        error: "Could not get products from server",
      })
    );
  }
}

function* watchSearchProductsByTitle() {
  yield takeLatest(
    searchActions.Types.FIND_PRODUCTS_BY_TITLE_REQUEST,
    getProductsByTitle
  );
}

const productsSagas = [
  fork(watchGetProductsRequest),
  fork(watchCreateProductRequest),
  fork(watchGetUserProductsRequest),
  fork(watchDeleteProductRequest),
  fork(watchGetProductRequest),
  fork(watchUpdateProductRequest),
  fork(watchSearchProductsByTitle),
];

export default productsSagas;
