import { combineReducers } from "redux";
import productsReducer from "../productComponents/productsReducers/ProductsReducer";
import usersReducer from "../userComponents/userReducers/UserReducer";
import authReducer from "../userComponents/userReducers/AuthReducer";
import userReducer from "../userComponents/userReducers/userProfileReducer";
import categoriesReducer from "../categoriesComponents/categoriesReducer";
import userProductsReducer from "../userComponents/userReducers/UserProductsReducer";
import createProductReducer from "../productComponents/productsReducers/NewProductReducer";
import updateProductReducer from "../productComponents/productsReducers/UpdateProductReducer";
import { shoppingCartReducer } from "../shoppingCartComponents/ShoppingCartReducers/ShoppingCartReducer";
import orderReducer from "../orderComponents/orderReducers/OrderReducer";
import globalReducer from "../adminComponents/adminReducer/globalReducer";
import adminAllOrdersReducer from "../adminComponents/adminReducer/adminAllOrdersReducer";
import adminAllProductsReducer from "../adminComponents/adminReducer/adminAllProductsReducer";
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
  cart: shoppingCartReducer,
  order: orderReducer,
  global: globalReducer,
  adminAllOrders: adminAllOrdersReducer,
  adminAllProducts: adminAllProductsReducer,
});

export default (state, action) =>
  rootReducer(
    action.type === Types.USER_AUTH_INITIATE_LOGOUT ? undefined : state,
    action
  );
