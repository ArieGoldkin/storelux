import React from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import { changeUserProducts } from "../../store/actions";

import CustomAvatar from "../common/UIElements/CustomAvatar";
import Card from "../common/UIElements/Card";
import "./usersCss/UserItem.css";

/// FIRST FIX HERE BEFORE CONTINUE
const UserItem = (props) => {
  const { productsUserChange } = props;

  const changeUserProducts = () => {
    productsUserChange();
  };

  return (
    <li className="user-item">
      <Card className="user-item__content cardPadding">
        <Link to={`/${props.id}/products`} onClick={changeUserProducts}>
          <div className="user-item__image">
            <CustomAvatar
              image={`${process.env.REACT_APP_BACKEND_URL}/${props.image}`}
              alt={props.firstName}
            />
          </div>
          <div className="user-item__info">
            <h2>{`${props.firstName} ${props.lastName}`}</h2>
            <h3>
              {props.productCount}{" "}
              {props.productCount === 1 ? "Product" : "Products"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    productsUserChange: () => dispatch(changeUserProducts()),
  };
};

export default connect(null, mapDispatchToProps)(UserItem);
