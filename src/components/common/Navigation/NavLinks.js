import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import {
  getAuthToken,
  getAuthUserId,
  getAuthAdmin,
} from "../../userComponents/selectors/AuthSelectors";
import AdminOptionDrawer from "../../adminComponents/AdminOptionDrawer";
import "./NavLinks.css";

const NavLinks = ({ isAuthenticated, userId, isAdmin }) => {
  return (
    <ul className="nav-links">
      {isAdmin === "admin" && (
        <li>
          <AdminOptionDrawer />
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
        <NavLink to="/products">ALL PRODUCTS</NavLink>
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
  };
};

export default connect(mapStateToProps)(NavLinks);
