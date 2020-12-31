import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { getGlobalDataRequest, userMessagesRequest } from "../../store/actions";
import {
  getAuthAdmin,
  getAuthToken,
  getAuthUserId,
} from "../../store/selectors";

import HomePage from "../../components/home/HomePage";
import AboutPage from "../../components/about/AboutPage";
import PageNotFound from "../../components/common/PageNoFound";
import UserOrders from "../../containers/users/Orders/Order";
import ProductsSales from "../../containers/users/ProductsSales/ProductsSales";
import InboxMessages from "../../containers/users/InboxMessages/InboxMessages";
import Logout from "../../containers/Auth/Logout/Logout";
import { ToastContainer } from "react-toastify";
import Admin from "../Admin/Admin";

const Users = React.lazy(() =>
  import("../../containers/users/usersList/Users")
);
const UserProfile = React.lazy(() =>
  import("../../containers/users/Profile/Profile")
);
const UpdateProfile = React.lazy(() =>
  import("../../containers/users/Profile/UpdateProfile")
);
const AllProducts = React.lazy(() =>
  import("../../containers/Products/Products")
);

const ProductsOrder = React.lazy(() =>
  import("../../containers/Order/OrderItems/ProductsOrder")
);
const Order = React.lazy(() => import("../../containers/Order/Order"));
const ShoppingCart = React.lazy(() =>
  import("../../containers/ShoppingCart/ShoppingCart")
);
const UserProducts = React.lazy(() =>
  import("../../containers/UserProducts/Products/Products")
);
const AddProduct = React.lazy(() =>
  import("../../containers/Product/AddProduct")
);
const UpdateProduct = React.lazy(() =>
  import("../../containers/Product/UpdateProduct")
);

const Authenticated = ({
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
    adminRoutes = <Admin />;
  }

  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/user/profile" component={UserProfile} />
        <Route exact path="/user/:userId" component={UpdateProfile} />
        <Route exact path="/user/profile/orders" component={UserOrders} />
        <Route
          exact
          path="/user/profile/productsSales"
          component={ProductsSales}
        />
        <Route exact path="/user/profile/inbox" component={InboxMessages} />
        <Route exact path="/products/page/:number" component={AllProducts} />
        <Route path="/:userId/shoppingCart/summary" component={ProductsOrder} />
        <Route path="/:userId/shoppingCart/:pcartId" component={Order} />
        <Route path="/:userId/shoppingCart" component={ShoppingCart} />
        <Route exact path="/:userId/products" component={UserProducts} />
        <Route exact path="/product/new" component={AddProduct} />
        <Route path="/product/:productId" component={UpdateProduct} />
        <Route path="/about" component={AboutPage} />
        <Route path="/logout" component={Logout} />
        {adminRoutes}
        <Route component={PageNotFound} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Authenticated);
