import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import * as adminActions from "../adminActions/adminActions";
import * as adminProductsSelectors from "../selectors/AllProductsSelectors";
import * as authSelectors from "../../userComponents/selectors/AuthSelectors";

import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
import LoadingSpinner from "../../common/UIElements/LoadingSpinner";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { green, red } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import CustomAvatar from "../../common/UIElements/CustomAvatar";

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
}));

const ShowAllProductsItem = (props) => {
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
      setIsLoading(true);
      setLoadingItem(null);
    }
  }, [itemLoading]);

  return (
    <>
      <TableCell align="left" className={classes.imageCellSize}>
        <CustomAvatar
          className="image_radius"
          image={props.image}
          alt={props.title}
        />
      </TableCell>
      <TableCell component="th" id={props.labelId} scope="row" padding="none">
        {props.title}
      </TableCell>
      <TableCell align="left">{props.owner}</TableCell>
      <TableCell align="left">{props.category}</TableCell>
      <TableCell align="left">{props.price + "$"}</TableCell>
      <TableCell align="left">{props.units}</TableCell>
      <TableCell
        index={place}
        align="left"
        className={classes.availableItemsPosition}
      >
        {place === loadingItem && isLoading ? (
          <div className="center">
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
    itemLoading: adminProductsSelectors.getItemLoading(state),
    adminId: authSelectors.getAuthUserId(state),
    token: authSelectors.getAuthToken(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeProductStatus: ({ adminId, token, productId }) =>
      dispatch(adminActions.changeStatusStart({ adminId, token, productId })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowAllProductsItem);
