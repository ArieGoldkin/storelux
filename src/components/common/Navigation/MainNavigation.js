import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  getAuthToken,
  getAuthUserId,
} from "../../userComponents/selectors/AuthSelectors";
import {
  getNumberOfMes,
  getCounterLoading,
  getErrorMessage,
} from "../../userComponents/selectors/UserMessagesSelectors";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import ErrorModal from "../UIElements/ErrorModal";

import CircularProgress from "@material-ui/core/CircularProgress";
import "./MainNavigation.css";
import cartImage from "../../../images/cartImage.png";

import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";

const useStyles = makeStyles((theme) => ({
  badgeSize: {
    margin: "0.3rem 0 0 1rem",
  },
  mailIconSize: {
    fontSize: "1.9rem",
    color: "#0069D9",
  },
  spinnerWrapper: {
    margin: "0.3rem 0 0 1rem",
  },
}));

const MainNavigation = ({
  isAuthenticated,
  userId,
  numberOfMessages,
  loading,
}) => {
  const classes = useStyles();
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [isLoading, SetIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (loading) {
      SetIsLoading(true);
    } else {
      SetIsLoading(false);
    }
  }, [loading]);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  const clearError = () => {
    setErrorMessage(null);
  };

  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <div className="main-navigation__content">
          {isAuthenticated && (
            <h1 className="main-navigation__title">
              <Link to={`/${userId}/products`}>YourProducts</Link>
            </h1>
          )}
          <Link to={`/${userId}/shoppingCart`}>
            <div className="image-cart__content">
              <img src={cartImage} alt="cart" />
            </div>
          </Link>
          {isAuthenticated && (
            <>
              {isLoading && (
                <div className={classes.spinnerWrapper}>
                  <CircularProgress size={35} />
                </div>
              )}
              {!isLoading && (
                <Link to="/user/profile/inbox">
                  <Badge
                    badgeContent={numberOfMessages}
                    className={classes.badgeSize}
                    color="secondary"
                  >
                    <MailIcon className={classes.mailIconSize} />
                  </Badge>
                </Link>
              )}
            </>
          )}
        </div>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: getAuthToken(state),
    userId: getAuthUserId(state),
    numberOfMessages: getNumberOfMes(state),
    loading: getCounterLoading(state),
    error: getErrorMessage(state),
  };
};

export default connect(mapStateToProps)(MainNavigation);
