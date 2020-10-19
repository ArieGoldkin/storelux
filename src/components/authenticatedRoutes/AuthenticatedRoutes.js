import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import * as adminActions from "../adminComponents/adminActions/adminActions";
import * as authSelectors from "../userComponents/selectors/AuthSelectors";
import HomePage from "../home/HomePage";
import AboutPage from "../about/AboutPage";
// import PageNotFound from "../common/PageNoFound";
import UserOrders from "../userComponents/userOrders/UserOrders";
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
const UserProducts = React.lazy(() =>
  import("../productComponents/UserProducts")
);
const NewProduct = React.lazy(() => import("../productComponents/NewProduct"));
const UpdateProduct = React.lazy(() =>
  import("../productComponents/UpdateProduct")
);

const AuthenticatedRoutes = ({ isAdmin, token, getGlobalData }) => {
  let adminRoutes;

  useEffect(() => {
    getGlobalData(token);
  }, [getGlobalData, token]);

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
    isAdmin: authSelectors.getAuthAdmin(state),
    token: authSelectors.getAuthToken(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGlobalData: (token) =>
      dispatch(adminActions.getGlobalDataRequest(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticatedRoutes);
