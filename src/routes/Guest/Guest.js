import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "../../components/home/HomePage";
import AboutPage from "../../components/about/AboutPage";
import RecoveryEmail from "../../containers/Auth/ResetPassword/RecoveryEmail";
import ResetPassword from "../../containers/Auth/ResetPassword/ResetPassword";
import { ToastContainer } from "react-toastify";
import PageNotFound from "../../components/common/PageNotFound/PageNoFound";

const Users = React.lazy(() =>
  import("../../containers/users/usersList/Users")
);
const AllProducts = React.lazy(() =>
  import("../../containers/Products/Products")
);
const UserProducts = React.lazy(() =>
  import("../../containers/UserProducts/Products/Products")
);
const Auth = React.lazy(() => import("../../containers/Auth/Auth"));

const Guest = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/products/page/:number" component={AllProducts} />
        <Route exact path="/:userId/products" component={UserProducts} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/RecoveryEmail" component={RecoveryEmail} />
        <Route exact path="/resetPassword/:token" component={ResetPassword} />
        <Route exact path="/auth" component={Auth} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </>
  );
};
export default Guest;
