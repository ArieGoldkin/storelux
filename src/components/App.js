import React, { useEffect, Suspense, useState } from "react";
import { connect } from "react-redux";

import AuthenticatedRoutes from "./authenticatedRoutes/AuthenticatedRoutes";
import NotAuthenticatedRoutes from "./notAuthenticatedRoutes/NotAuthenticatedRoutes";

import ErrorModal from "./common/UIElements/ErrorModal";
import MainNavigation from "../components/common/Navigation/MainNavigation";
import LoadingSpinner from "./common/UIElements/LoadingSpinner";
import * as actions from "./userComponents/usersActions/authActions";
import {
  getAuthToken,
  getLogOutMessage,
} from "./userComponents/selectors/AuthSelectors";
import "react-toastify/dist/ReactToastify.css";

const App = ({ isAuthenticated, onTryAutoSignup, logOutMessage }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  let routes;
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  if (isAuthenticated) {
    routes = <AuthenticatedRoutes />;
  } else {
    routes = <NotAuthenticatedRoutes />;
  }

  useEffect(() => {
    logOutMessage && setErrorMessage(logOutMessage.message);
  }, [logOutMessage]);

  const clearError = () => {
    setErrorMessage(null);
  };

  return (
    <div className="container-fluid">
      <ErrorModal error={errorMessage} onClear={clearError} />
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
    logOutMessage: getLogOutMessage(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
