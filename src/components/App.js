import React, { useEffect, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Logout from "./userComponents/Logout";
import MainNavigation from "../components/common/Navigation/MainNavigation";
import LoadingSpinner from "./common/UIElements/LoadingSpinner";
// import PageNotFound from "./common/PageNoFound";
import * as actions from "./userComponents/usersActions/authActions";
import { ToastContainer } from "react-toastify";
import * as authSelectors from "./userComponents/selectors/AuthSelectors";
import "react-toastify/dist/ReactToastify.css";
import AddCategory from "./adminComponents/addCategory/AddCategory";

const AllProducts = React.lazy(() =>
  import("../components/productComponents/AllProducts")
);
const NewProduct = React.lazy(() => import("./productComponents/NewProduct"));
const UpdateProduct = React.lazy(() =>
  import("./productComponents/UpdateProduct")
);
const UserProducts = React.lazy(() =>
  import("./productComponents/UserProducts")
);
const Auth = React.lazy(() => import("./userComponents/Auth"));
const Users = React.lazy(() => import("./userComponents/Users"));
const UserProfile = React.lazy(() => import("./userComponents/UserProfile"));
const UpdateUserProfile = React.lazy(() =>
  import("./userComponents/UpdateUserProfile")
);
const ShoppingCart = React.lazy(() =>
  import("./shoppingCartComponents/ShoppingCart")
);
const Order = React.lazy(() => import("./orderComponents/Order"));
const AllProductsOrder = React.lazy(() =>
  import("./orderComponents/AllProductsOrder")
);

const App = ({ isAuthenticated, onTryAutoSignup, isAdmin }) => {
  let routes;
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  if (isAuthenticated) {
    routes = (
      <>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/user/profile" component={UserProfile} />
          <Route exact path="/user/:userId" component={UpdateUserProfile} />
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
          {isAdmin && <Route path="/addcategory" component={AddCategory} />}
          <Redirect to="/products" />
          {/* <Route component={PageNotFound} /> */}
        </Switch>
        <ToastContainer autoClose={3000} hideProgressBar />
      </>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/users" component={Users} />
        <Route path="/products" component={AllProducts} />
        <Route exact path="/:userId/products" component={UserProducts} />
        <Route path="/about" component={AboutPage} />
        <Route path="/auth" component={Auth} />
        {/* <Route component={PageNotFound} /> */}
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <div className="container-fluid">
      <MainNavigation />
      <main>
        <Suspense
          fallback={
            <div className="center">
              <LoadingSpinner />
            </div>
          }
        >
          {routes}
        </Suspense>
      </main>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: authSelectors.getAuthtoken(state),
    isAdmin: authSelectors.getAuthAdmin(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
