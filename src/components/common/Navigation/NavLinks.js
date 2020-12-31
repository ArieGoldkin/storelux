import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import {
  getAuthToken,
  getAuthUserId,
  getAuthAdmin,
  getRedirectPath,
} from "../../../store/selectors";
import DrawerOptions from "../../Admin/DrawerOptions";
import "./NavLinks.css";

const NavLinks = ({ isAuthenticated, userId, isAdmin, pageNumber }) => {
  return (
    <ul className="nav-links">
      {isAdmin === "admin" && (
        <li>
          <DrawerOptions />
        </li>
      )}
      <li>
        <NavLink to="/" exact>
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink to="/users" exact>
          ALL USERS
        </NavLink>
      </li>
      {isAuthenticated && (
        <li>
          <NavLink to={`/${userId}/products`}>MY PRODUCTS</NavLink>
        </li>
      )}
      <li>
        <NavLink to={`/products/page/${pageNumber}`}>ALL PRODUCTS</NavLink>
      </li>
      {isAuthenticated && (
        <li>
          <NavLink to="/product/new">ADD PRODUCT</NavLink>
        </li>
      )}
      <li>
        <NavLink to="/about">ABOUT US</NavLink>
      </li>
      {isAuthenticated && (
        <li>
          <NavLink to="/user/profile">PROFILE</NavLink>
        </li>
      )}
      {!isAuthenticated && (
        <li>
          <NavLink to="/auth">LOGIN</NavLink>
        </li>
      )}
      {isAuthenticated && (
        <li>
          <NavLink to="/logout">LOGOUT</NavLink>
        </li>
      )}
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: getAuthToken(state),
    userId: getAuthUserId(state),
    isAdmin: getAuthAdmin(state),
    pageNumber: getRedirectPath(state),
  };
};

export default connect(mapStateToProps)(NavLinks);
