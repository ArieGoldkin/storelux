import { combineReducers } from "redux";
import authReducer from "./user/auth";
import profileReducer from "./user/profile";
import userReducer from "./user/user";
import userProductsReducer from "./user/userProducts";
import shoppingCartReducer from "./shoppingCart/cart";
import newProductReducer from "./products/newProduct";
import productsReducer from "./products/products";
import updateProductReducer from "./products/updateProduct";
import orderReducer from "./order/order";
import categoriesReducer from "./categories/categories";
import adminOrdersReducer from "./admin/order";
import adminProductsReducer from "./admin/products";
import globalData from "./admin/globalData";

const rootReducer = combineReducers({
  auth: authReducer,
  userProfile: profileReducer,
  users: userReducer,
  userProducts: userProductsReducer,
  cart: shoppingCartReducer,
  newProduct: newProductReducer,
  products: productsReducer,
  updateProduct: updateProductReducer,
  order: orderReducer,
  categories: categoriesReducer,
  adminOrders: adminOrdersReducer,
  adminProducts: adminProductsReducer,
  globalData: globalData,
});

export default rootReducer;
