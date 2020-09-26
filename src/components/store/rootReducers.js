import { combineReducers } from "redux";
import productsReducer from "../productComponents/productsReducers/ProductsReducer";
import usersReducer from "../userComponents/userReducers/UserReducer";
import authReducer from "../userComponents/userReducers/AuthReducer";
import userReducer from "../userComponents/userReducers/userProfileReducer";
import categoriesReducer from "../categoriesComponents/categoriesReducer";
import userProductsReducer from "../productComponents/productsReducers/UserProductsReducer";
import createProductReducer from "../productComponents/productsReducers/NewProductReducer";
import updateProductReducer from "../productComponents/productsReducers/UpdateProductReducer";
import addProductToCartReducer from "../productComponents/productsReducers/AddProductToCartReducer";
import { shoppingCartReducer } from "../shoppingCartComponents/ShoppingCartReducers/ShoppingCartReducer";
import orderReducer from "../orderComponents/orderReducers/OrderReducer";
import adminReducer from "../adminComponents/adminReducer/adminReducer";
import { Types } from "../userComponents/usersActions/authActions";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
  users: usersReducer,
  auth: authReducer,
  user: userReducer,
  userProducts: userProductsReducer,
  newProduct: createProductReducer,
  updateProduct: updateProductReducer,
  addToCart: addProductToCartReducer,
  cart: shoppingCartReducer,
  order: orderReducer,
  admin: adminReducer,
});

export default (state, action) =>
  rootReducer(
    action.type === Types.USER_AUTH_INITIATE_LOGOUT ? undefined : state,
    action
  );
