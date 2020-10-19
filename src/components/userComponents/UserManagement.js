import React from "react";

import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";

import Button from "../common/FormElements/Button";
import Card from "../common/UIElements/Card";
const useStyles = makeStyles((theme) => ({
  btnSize: {
    width: "78%",
    padding: "0.3rem",
    margin: "1rem 0 0 0",
    border: "none",
  },
}));

const UserManagement = (props) => {
  const classes = useStyles();

  return (
    <Card className="user-profile__manage">
      <div>
        <h3>Profile Management</h3>
      </div>
      <Button to="/user/profile/orders" buttonClass={classes.btnSize}>
        Orders history
      </Button>
      <Button to="/user/profile/sales" buttonClass={classes.btnSize}>
        Products Sales
      </Button>
    </Card>
  );
};

export default UserManagement;
