import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../common/UIElements/Avatar";
import Card from "../common/UIElements/Card";
import "./usersCss/UserItem.css";

const UserItem = (props) => {
  return (
    <li className="user-item">
      <Card className="user-item__content cardPadding">
        <Link to={`/${props.id}/products`}>
          <div className="user-item__image">
            <Avatar
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

export default UserItem;
