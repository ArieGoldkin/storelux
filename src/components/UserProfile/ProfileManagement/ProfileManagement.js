import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Button from "../../common/FormElements/Button";
import Card from "../../common/UIElements/Card";
import "./ProfileManagement.css";

const useStyles = makeStyles((theme) => ({
  btnSize: {
    width: "78%",
    padding: "0.3rem",
    margin: "1rem 0 0 0",
    border: "none",
  },
}));

const ProfileManagement = (props) => {
  const classes = useStyles();

  return (
    <Card className="user-profile__manage">
      <div>
        <h3>Profile Management</h3>
      </div>
      <Button to="/user/profile/orders" buttonClass={classes.btnSize}>
        Orders history
      </Button>
      <Button to="/user/profile/productsSales" buttonClass={classes.btnSize}>
        Products Sales
      </Button>
      <Button to="/user/profile/inbox" buttonClass={classes.btnSize}>
        Messages inBox
      </Button>
    </Card>
  );
};

export default ProfileManagement;
