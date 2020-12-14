import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  getAuthToken,
  getAuthUserId,
  getUserOrdersItems,
  getUserOrdersLoading,
  getUserOrdersError,
} from "../../../store/selectors";
import {
  getUserOrdersRequest,
  getUserOrdersByDateRequest,
} from "../../../store/actions";

import Button from "../../common/FormElements/Button";
import Card from "../../common/UIElements/Card";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import { columnsTable } from "./columnsTableData";
import UserOrdersList from "./UserOrdersList";
import DatePicker from "../../common/FormElements/DatePicker";
import LoadingSpinner from "../../common/UIElements/LoadingSpinner";

const useStyles = makeStyles((theme) => ({
  tableWrapper: {
    width: "60%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: "0.5rem",
    padding: 0,
    [theme.breakpoints.down("lg")]: {
      width: "83%",
    },
  },
  container: {
    maxHeight: "45rem",
  },
  headerFontStyle: {
    fontSize: "1rem",
    fontWeight: "bold",
    paddingTop: "1.8rem",
  },
  btnStyle: {
    width: "60%",
    margin: "0 auto",
    [theme.breakpoints.down("lg")]: {
      width: "83%",
    },
  },
  searchWrapper: {
    alignItems: "center",
    display: "flex",
    margin: "1rem 0 0 0",
    justifyContent: "space-around",
  },
  searchHeader: {
    margin: "1rem 1rem 0",
    fontSize: "1.1rem",
  },
  getAllOrdersBtn: {
    margin: "1rem 1rem 0 0",
  },
}));

const UserOrders = ({
  userId,
  token,
  getOrders,
  orders,
  loading,
  getOrdersByDate,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [fromSelectedDate, setFromSelectedDate] = useState(new Date());
  const [ToSelectedDate, setToSelectedDate] = useState(new Date());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    loading ? setIsLoading(true) : setIsLoading(false);
  }, [loading]);

  const getAllOrdersHandler = () => {
    getOrders({ token, userId });
  };

  useEffect(() => {
    getOrdersByDate({ token, userId, fromSelectedDate, ToSelectedDate });
  }, [ToSelectedDate, fromSelectedDate, getOrdersByDate, token, userId]);

  return (
    <>
      <div className={classes.btnStyle}>
        <Button onClick={() => history.push("/user/profile")}>
          Back to profile
        </Button>
      </div>
      <Card className={classes.tableWrapper}>
        <div className={classes.searchWrapper}>
          <h4 className={classes.searchHeader}>Search orders by date range:</h4>
          <DatePicker
            fromSelectedDate={fromSelectedDate}
            setFromSelectedDate={setFromSelectedDate}
            ToSelectedDate={ToSelectedDate}
            setToSelectedDate={setToSelectedDate}
          />
          <Button
            onClick={getAllOrdersHandler}
            className={classes.getAllOrdersBtn}
          >
            Show all orders
          </Button>
        </div>
        {isLoading && (
          <div className="center">
            <LoadingSpinner style={{ display: "flex", alignItems: "center" }} />
          </div>
        )}
        {!isLoading && orders && (
          <Paper>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    {columnsTable.map((column) => (
                      <TableCell
                        className={classes.headerFontStyle}
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((order) => {
                      return <UserOrdersList key={order.id} item={order} />;
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={orders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        )}
      </Card>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: getAuthUserId(state),
    token: getAuthToken(state),
    orders: getUserOrdersItems(state),
    loading: getUserOrdersLoading(state),
    error: getUserOrdersError(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: ({ token, userId }) =>
      dispatch(getUserOrdersRequest({ token, userId })),
    getOrdersByDate: ({ token, userId, fromSelectedDate, ToSelectedDate }) =>
      dispatch(
        getUserOrdersByDateRequest({
          token,
          userId,
          fromSelectedDate,
          ToSelectedDate,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserOrders);
