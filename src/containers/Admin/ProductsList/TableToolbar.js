import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { DeleteProductsRequest } from "../../../store/actions";
import {
  getAuthAdmin,
  getAuthUserId,
  getAuthToken,
} from "../../../store/selectors";

import { lighten, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: "#0069D9",
          backgroundColor: lighten(theme.palette.primary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const TableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {
    numSelected,
    selectedItems,
    isAdmin,
    adminId,
    token,
    onDeleteRequest,
  } = props;

  const deleteHandler = () => {
    console.log(selectedItems);
    if (isAdmin === "admin") {
      onDeleteRequest({ selectedItems, adminId, token });
    }
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected === 1
            ? `${numSelected} Selected item`
            : `${numSelected} Selected items`}
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Products
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={deleteHandler}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAdmin: getAuthAdmin(state),
    adminId: getAuthUserId(state),
    token: getAuthToken(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteRequest: ({ selectedItems, adminId, token }) =>
      dispatch(DeleteProductsRequest({ selectedItems, adminId, token })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableToolbar);
