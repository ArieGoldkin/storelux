import React from "react";
import { connect } from "react-redux";

import { changeUserProducts } from "../../../store/actions";

import Card from "../../../components/common/UIElements/Card";
import UserItem from "../../../components/Users/UserItem";
import "./Users.css";

const UsersList = (props) => {
  const { productsUserChange } = props;
  if (props.items.length === 0) {
    return (
      <Card className="no_users_found">
        <div className="center">
          <h2>No users found.</h2>
        </div>
      </Card>
    );
  }

  const changeUserProducts = () => {
    productsUserChange();
  };

  return (
    <ul className="users-list">
      {props.items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          firstName={user.firstName}
          lastName={user.lastName}
          productCount={user.products.length}
          changeUser={changeUserProducts}
        />
      ))}
    </ul>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    productsUserChange: () => dispatch(changeUserProducts()),
  };
};

export default connect(null, mapDispatchToProps)(UsersList);
