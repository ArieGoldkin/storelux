import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import { getGlobalDataRequest } from "../adminComponents/adminActions/adminActions";
import { userMessagesRequest } from "../userComponents/usersActions/UserMessagesAction";
import {
  getAuthAdmin,
  getAuthToken,
  getAuthUserId,
} from "../userComponents/selectors/AuthSelectors";
import HomePage from "../home/HomePage";
import AboutPage from "../about/AboutPage";
// import PageNotFound from "../common/PageNoFound";
import UserOrders from "../userComponents/userOrders/UserOrders";
import ProductsSales from "../userComponents/productsSales/ProductsSales";
import InboxMessages from "../userComponents/inBoxMessages/InboxMessages";
import Logout from "../userComponents/Logout";
import AdminRoutes from "./AdminRoutes";
import { ToastContainer } from "react-toastify";

const Users = React.lazy(() => import("../userComponents/Users"));
const UserProfile = React.lazy(() => import("../userComponents/UserProfile"));
const UpdateUserProfile = React.lazy(() =>
  import("../userComponents/UpdateUserProfile")
);
const AllProducts = React.lazy(() =>
  import("../productComponents/AllProducts")
);

const AllProductsOrder = React.lazy(() =>
  import("../orderComponents/AllProductsOrder")
);
const Order = React.lazy(() => import("../orderComponents/Order"));
const ShoppingCart = React.lazy(() =>
  import("../shoppingCartComponents/ShoppingCart")
);
const UserProducts = React.lazy(() => import("../userComponents/UserProducts"));
const NewProduct = React.lazy(() => import("../productComponents/NewProduct"));
const UpdateProduct = React.lazy(() =>
  import("../productComponents/UpdateProduct")
);

const AuthenticatedRoutes = ({
  isAdmin,
  token,
  userId,
  getGlobalData,
  getUserMessages,
}) => {
  let adminRoutes;

  useEffect(() => {
    getGlobalData(token);
    getUserMessages({ token, userId });
  }, [getGlobalData, getUserMessages, token, userId]);

  if (isAdmin === "admin") {
    adminRoutes = <AdminRoutes />;
  }

  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/user/profile" component={UserProfile} />
        <Route exact path="/user/:userId" component={UpdateUserProfile} />
        <Route exact path="/user/profile/orders" component={UserOrders} />
        <Route
          exact
          path="/user/profile/productsSales"
          component={ProductsSales}
        />
        <Route exact path="/user/profile/inbox" component={InboxMessages} />
        <Route path="/products" component={AllProducts} />
        <Route
          path="/:userId/shoppingCart/summary"
          component={AllProductsOrder}
        />
        <Route path="/:userId/shoppingCart/:pcartId" component={Order} />
        <Route path="/:userId/shoppingCart" component={ShoppingCart} />
        <Route exact path="/:userId/products" component={UserProducts} />
        <Route exact path="/product/new" component={NewProduct} />
        <Route path="/product/:productId" component={UpdateProduct} />
        <Route path="/about" component={AboutPage} />
        <Route path="/logout" component={Logout} />
        {adminRoutes}
        <Redirect to="/products" />
        {/* <Route component={PageNotFound} /> */}
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAdmin: getAuthAdmin(state),
    token: getAuthToken(state),
    userId: getAuthUserId(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGlobalData: (token) => dispatch(getGlobalDataRequest(token)),
    getUserMessages: ({ token, userId }) =>
      dispatch(userMessagesRequest({ token, userId })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticatedRoutes);
