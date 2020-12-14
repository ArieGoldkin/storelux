import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getAuthToken } from "../../store/selectors";
import "./HomePage.css";

const HomePage = ({ isAuthenticated }) => {
  return (
    <>
      <div className="home-container">
        <div className="home-title">
          <h1 className="home-header__title">WELCOME TO STORELUX</h1>
          <p className="home-header__p">
            Welcome to A new way of buying and selling online,
          </p>
          <p className="home-header__p">For all Business and Private Users</p>
          <div className="home-buttons">
            <Link style={{ textDecoration: "none", color: "#fff" }} to="about">
              <button className="btn">ABOUT US</button>
            </Link>
            {!isAuthenticated && (
              <Link
                to="/auth"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <button className="btn">
                  {" "}
                  <span>LOGIN</span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: getAuthToken(state),
  };
};

export default connect(mapStateToProps)(HomePage);
