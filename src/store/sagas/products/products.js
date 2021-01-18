import { call, put } from "redux-saga/effects";

import * as actions from "../../actions";
import * as api from "../../../api";
import { toast } from "react-toastify";

export function* getProducts() {
  try {
    const result = yield call(api.getProducts);
    yield put(
      actions.getProductsSuccess({
        items: result.data.products,
      })
    );
  } catch (e) {
    yield put(
      actions.productError({
        error: "An error happened when trying to get Products",
      })
    );
  }
}

export function* createProduct(action) {
  try {
    const responseData = yield call(api.createProduct, {
      token: action.token,
      formData: action.formData,
    });
    yield put(actions.createProductSuccess(responseData.data.product));
    yield toast.info("Product successfully added.");
  } catch (e) {
    yield put(
      actions.createProductFailure({
        error: "An error happened when trying to add new product",
      })
    );
  }
}

export function* updateProduct(action) {
  try {
    const responseData = yield call(api.updateProduct, {
      token: action.token,
      productId: action.productId,
      formData: action.formData,
    });
    yield put(actions.updateProductSuccess(responseData.data.product));
    yield toast.info("Product updated successfully.");
  } catch (e) {
    yield put(
      actions.updateProductFailure({
        error:
          "Could not update the requested product, please check connection and try again.",
      })
    );
  }
}

export function* getProductRequest(action) {
  try {
    const responseData = yield call(api.getProductById, {
      productId: action.productId,
    });
    yield put(actions.getProductSuccess(responseData.data.product));
  } catch (e) {
    yield put(
      actions.getProductFailure({
        error: "Could not get the requested product, Please try again",
      })
    );
  }
}

export function* getUserProducts(action) {
  try {
    const responseData = yield call(api.getUserProducts, {
      userId: action.userId,
    });
    yield put(
      actions.getUserProductsSuccess({
        items: responseData.data.products,
      })
    );
  } catch (e) {
    yield put(
      actions.getUserProductsFailure({
        error: "Could not get users products, Please try again.",
      })
    );
  }
}

// NEED TO CLEAN UP NO NEED FOR USER ID HERE
export function* deleteProductRequest({ token, productId, userId }) {
  try {
    yield call(api.deleteProduct, token, productId);
    yield put(actions.deleteProductSuccess(productId));
    yield toast.info("Product successfully removed.");
  } catch (e) {
    yield put(
      actions.deleteProductFailure({
        error: "Could not Delete products, Please try again.",
      })
    );
  }
}

export function* getProductsByTitle(action) {
  try {
    const responseData = yield call(api.findProductByTitle, {
      title: action.payload.title,
    });
    yield put(actions.searchProductsByTitleSuccess(responseData.data.products));
  } catch (e) {
    yield put(
      actions.searchProductsByTitleFailure({
        error: "Could not get products from server",
      })
    );
  }
}

export function* getProductsByCategory(action) {
  try {
    const responseData = yield call(api.findProductsByCategory, {
      category: action.payload.category,
    });
    yield put(
      actions.searchProductsByCategorySuccess(responseData.data.products)
    );
  } catch (e) {
    console.log(e.response.data);
    yield put(
      actions.searchProductsByCategoryFailure({
        error: e.response.data.message,
      })
    );
  }
}
