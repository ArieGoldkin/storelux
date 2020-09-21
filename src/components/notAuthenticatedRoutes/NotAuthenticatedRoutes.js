import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import HomePage from "../home/HomePage";
import AboutPage from "../about/AboutPage";

const Users = React.lazy(() => import("../userComponents/Users"));
const AllProducts = React.lazy(() =>
  import("../productComponents/AllProducts")
);
const UserProducts = React.lazy(() =>
  import("../productComponents/UserProducts")
);
const Auth = React.lazy(() => import("../userComponents/Auth"));

const notAuthenticatedRoutes = () => {
  return (
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
};
export default notAuthenticatedRoutes;
