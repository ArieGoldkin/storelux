import { all } from "redux-saga/effects";
import productsSagas from "../productComponents/productsSaga/productsSaga";
import addToCartSagas from "../productComponents/productsSaga/addToCartSaga";
import usersSagas from "../userComponents/userSagas/UserSaga";
import userMessageSagas from "../userComponents/userSagas/UserMessageSaga";
import authSagas from "../userComponents/userSagas/authSaga";
import categoriesSagas from "../categoriesComponents/categoriesSaga";
import cartSagas from "../shoppingCartComponents/shoppingCartSagas/ShoppingCartSaga";
import orderSagas from "../orderComponents/orderSagas/OrderSagas";
import adminSagas from "../adminComponents/adminSaga/adminSagas";
import ResetPasswordSagas from "../userComponents/userSagas/ResetPasswordSaga";

const combineSagas = [
  ...productsSagas,
  ...addToCartSagas,
  ...usersSagas,
  ...authSagas,
  ...categoriesSagas,
  ...cartSagas,
  ...orderSagas,
  ...adminSagas,
  ...ResetPasswordSagas,
  ...userMessageSagas,
];

export default function* rootSaga() {
  yield all({
    ...combineSagas,
  });
}
