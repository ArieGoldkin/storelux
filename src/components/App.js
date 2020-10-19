import React, { useEffect, Suspense } from "react";
import { connect } from "react-redux";

import AuthenticatedRoutes from "./authenticatedRoutes/AuthenticatedRoutes";
import NotAuthenticatedRoutes from "./notAuthenticatedRoutes/NotAuthenticatedRoutes";

import MainNavigation from "../components/common/Navigation/MainNavigation";
import LoadingSpinner from "./common/UIElements/LoadingSpinner";
import * as actions from "./userComponents/usersActions/authActions";
import { getAuthToken } from "./userComponents/selectors/AuthSelectors";
import "react-toastify/dist/ReactToastify.css";

const App = ({ isAuthenticated, onTryAutoSignup }) => {
  let routes;
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  if (isAuthenticated) {
    routes = <AuthenticatedRoutes />;
  } else {
    routes = <NotAuthenticatedRoutes />;
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
    isAuthenticated: getAuthToken(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
