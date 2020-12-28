import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { changeStatusStart } from "../../../store/actions";
import {
  getAdminProductsItemLoading,
  getAuthUserId,
  getAuthToken,
} from "../../../store/selectors";

import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
import LoadingSpinner from "../../../components/common/UIElements/LoadingSpinner";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { green, red } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import CustomAvatar from "../../../components/common/UIElements/CustomAvatar";

const useStyles = makeStyles((theme) => ({
  imageCellSize: {
    width: "7rem",
    height: " 6rem",
    padding: "0.5rem 1rem",
  },
  itemsPosition: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatarImageRadius: {
    borderRadius: "0.5rem",
  },
  spinnerPosition: {
    display: "flex",
    marginLeft: "4rem",
    justifyContent: "center",
    textAlign: "center",
  },
}));

const ProductsItem = (props) => {
  const classes = useStyles();
  const {
    productId,
    changeProductStatus,
    itemLoading,
    place,
    adminId,
    token,
  } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [loadingItem, setLoadingItem] = useState(null);

  const changeStatusHandler = (event) => {
    event.preventDefault();
    setLoadingItem(place);
    changeProductStatus({ adminId, token, productId });
    setIsLoading(true);
  };

  useEffect(() => {
    if (itemLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setLoadingItem(null);
    }
  }, [itemLoading]);

  return (
    <>
      <TableCell align="left" className={classes.imageCellSize}>
        <CustomAvatar
          borderRadius="0.5rem"
          image={props.image}
          alt={props.title}
        />
      </TableCell>
      <TableCell component="th" id={props.labelId} scope="row" padding="none">
        {props.title}
      </TableCell>
      <TableCell align="left">{props.owner}</TableCell>
      <TableCell align="left">{props.category}</TableCell>
      <TableCell align="left">{"$" + props.price}</TableCell>
      <TableCell align="left">{props.units}</TableCell>
      <TableCell
        index={place}
        align="left"
        className={classes.availableItemsPosition}
      >
        {place === loadingItem && isLoading ? (
          <div className={classes.spinnerPosition}>
            <LoadingSpinner style={{ height: "6vh" }} />
          </div>
        ) : props.available ? (
          <div className={classes.itemsPosition}>
            <FiberManualRecordIcon style={{ color: green[500] }} />
            <Button
              variant="contained"
              style={{ color: red[500] }}
              onClick={changeStatusHandler}
            >
              Set Unavailable
            </Button>
          </div>
        ) : (
          <div className={classes.itemsPosition}>
            <FiberManualRecordIcon style={{ color: red[500] }} />
            <Button
              variant="contained"
              style={{ color: green[500] }}
              onClick={changeStatusHandler}
            >
              Set available
            </Button>
          </div>
        )}
      </TableCell>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    itemLoading: getAdminProductsItemLoading(state),
    adminId: getAuthUserId(state),
    token: getAuthToken(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeProductStatus: ({ adminId, token, productId }) =>
      dispatch(changeStatusStart({ adminId, token, productId })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsItem);
