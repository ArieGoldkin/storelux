import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import { authUserLogout } from "../store/rootReducers";

import * as actions from "./usersActions/authActions";

const Logout = ({ onLogout }) => {
  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Redirect to="/" />;
};

const mapStateToProps = (state) => {
  return {
    state: state,
    // setAllStateOnlogout: authUserLogout(state, state.auth.isLogin),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
