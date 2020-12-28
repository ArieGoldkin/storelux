import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { getUserSoldItemsRequest } from "../../../store/actions";

import {
  getAuthToken,
  getAuthUserId,
  getUserSoldItems,
  getUserSoldLoading,
  getUserSoldError,
} from "../../../store/selectors";

import Card from "../../../components/common/UIElements/Card";
import Button from "../../../components/common/FormElements/Button";
import LoadingSpinner from "../../../components/common/UIElements/LoadingSpinner";
import ProductsSalesChart from "./ProductsSalesChart";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  root: {
    width: "100%",
  },
  chartWrapper: {
    width: "60%",
    margin: "1rem auto",
  },
  btnClass: {
    marginBottom: "0.5rem",
  },
});

const ProductsSales = ({
  userSoldItems,
  getSoldItems,
  userId,
  token,
  loading,
}) => {
  const classes = styles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
      getSoldItems({ token, userId });
    } else {
      setIsLoading(false);
    }
  }, [getSoldItems, loading, token, userId]);

  return (
    <div className={classes.chartWrapper}>
      <div className={classes.btnClass}>
        <Button onClick={() => history.push("/user/profile")}>
          Back to profile
        </Button>
      </div>
      <Card className={classes.root}>
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && userSoldItems && (
          <ProductsSalesChart products={userSoldItems} />
        )}
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: getAuthToken(state),
    userId: getAuthUserId(state),
    userSoldItems: getUserSoldItems(state),
    loading: getUserSoldLoading(state),
    errorSoldItems: getUserSoldError(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSoldItems: ({ token, userId }) =>
      dispatch(getUserSoldItemsRequest({ token, userId })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsSales);
