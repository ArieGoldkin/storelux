import React, { useEffect, Suspense, useState } from "react";
import { connect } from "react-redux";

import Guest from "./routes/Guest/Guest";
import Authenticated from "./routes/Authenticated/Authenticated";

import ErrorModal from "./components/common/UIElements/ErrorModal";
import MainNavigation from "./components/common/Navigation/MainNavigation";
import LoadingSpinner from "./components/common/UIElements/LoadingSpinner";

import { authCheckState } from "./store/actions";

import { getAuthToken, getLogOutMessage } from "./store/selectors";

import "react-toastify/dist/ReactToastify.css";

const App = (props) => {
  const { isAuthenticated, onTryAutoSignup, logOutMessage } = props;
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes;
  if (isAuthenticated) {
    routes = <Authenticated />;
  } else {
    routes = <Guest />;
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
    onTryAutoSignup: () => dispatch(authCheckState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
