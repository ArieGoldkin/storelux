import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import ListIcon from "@material-ui/icons/List";
import ViewListIcon from "@material-ui/icons/ViewList";
import BarChartIcon from "@material-ui/icons/BarChart";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  Link: {
    textDecoration: "none",
    color: "inherit",
  },
});

const AdminOptionDrawer = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({
    left: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const listOptionObject = [
    { title: "Add new category", linkTo: "/admin/addcategory" },
    { title: "Show all products", linkTo: "/admin/showallProducts" },
    { title: "Fixed rate changes", linkTo: "/admin/ratechanges" },
    { title: "All orders", linkTo: "/admin/allorders" },
    { title: "Traffic Charts", linkTo: "/admin/trafficChart" },
  ];

  const list = (anchor) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {listOptionObject.map((type, index) => (
          <Link className={classes.Link} to={type.linkTo} key={type.title}>
            <ListItem button key={type.title}>
              <ListItemIcon>
                {type.title === "Add new category" && (
                  <AddCircleOutlineRoundedIcon />
                )}
                {type.title === "Show all products" && <ViewListIcon />}
                {type.title === "Fixed rate changes" && (
                  <MonetizationOnOutlinedIcon />
                )}
                {type.title === "All orders" && <ListIcon />}
                {type.title === "Traffic Charts" && <BarChartIcon />}
              </ListItemIcon>
              <ListItemText primary={type.title} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>Admin Toolbar</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default AdminOptionDrawer;
