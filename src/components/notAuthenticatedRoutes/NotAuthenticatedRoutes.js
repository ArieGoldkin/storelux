import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import HomePage from "../home/HomePage";
import AboutPage from "../about/AboutPage";
import RecoveryEmail from "../../containers/Auth/ResetPassword/RecoveryEmail";
import ResetPassword from "../../containers/Auth/ResetPassword/ResetPassword";
import { ToastContainer } from "react-toastify";
// import PageNotFound from "../common/PageNoFound";

const Users = React.lazy(() => import("../userComponents/Users"));
const AllProducts = React.lazy(() =>
  import("../productComponents/AllProducts")
);
const UserProducts = React.lazy(() => import("../userComponents/UserProducts"));
const Auth = React.lazy(() => import("../../containers/Auth/Auth"));

const notAuthenticatedRoutes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/:userId/products" component={UserProducts} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/resetPassword" component={RecoveryEmail} />
        <Route exact path="/resetPassword/:token" component={ResetPassword} />
        <Route exact path="/auth" component={Auth} />
        <Redirect to="/auth" />
        {/* <Route component={PageNotFound} /> */}
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </>
  );
};
export default notAuthenticatedRoutes;
