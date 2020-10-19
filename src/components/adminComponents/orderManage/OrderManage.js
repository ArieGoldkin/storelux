import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { columnsTable } from "./TableColumns";
import { useStyle } from "./OrderManageStyle";
import * as adminActions from "../adminActions/adminActions";
import * as usersActions from "../../userComponents/usersActions/UserActions";
import {
  getAllOrders,
  getIsDone,
  getAllOrdersLoading,
  getAllOrdersError,
} from "../selectors/AllOrdersSelectors";
import {
  getAuthToken,
  getAuthUserId,
} from "../../userComponents/selectors/AuthSelectors";
import {
  getUsers,
  getUsersLoading,
} from "../../userComponents/selectors/UserSelectors";

import Card from "../../common/UIElements/Card";
import LoadingSpinner from "../../common/UIElements/LoadingSpinner";
import ErrorModal from "../../common/UIElements/ErrorModal";
import DatePicker from "../../common/FormElements/DatePicker";
import { Paper, TextField } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import OrderListItems from "./OrderListItems";

const OrderManage = ({
  token,
  adminId,
  getOrdersByDate,
  loading,
  orders,
  users,
  getUsers,
  userLoading,
  getOrdersByUserName,
  ordersError,
}) => {
  const classes = useStyle();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [fromSelectedDate, setFromSelectedDate] = useState(new Date());
  const [ToSelectedDate, setToSelectedDate] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState(null);
  const [userName, setUserName] = useState();

  const nameChangeHandler = (event) => {
    event.preventDefault();
    setUserName(event.target.value);
    // console.log(event.target.value);
    // console.log(userName);
    // console.log(...userName);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    getOrdersByDate({ token, adminId, fromSelectedDate, ToSelectedDate });
  }, [ToSelectedDate, adminId, fromSelectedDate, getOrdersByDate, token]);

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    if (userLoading) {
      getUsers();
    }
  }, [getUsers, userLoading]);

  useEffect(() => {
    ordersError && setErrorMessage(ordersError.error);
  }, [ordersError]);

  useEffect(() => {
    const timer = setTimeout(() => {
      getOrdersByUserName({ token, adminId, userName });
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [adminId, getOrdersByUserName, token, userName]);

  const clearError = () => {
    setErrorMessage(null);
  };

  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      <Card className={classes.tableWrapper}>
        <div className={classes.datePickerWrapper}>
          <h4 className={classes.datePickerHeader}>
            Search orders by date range:
          </h4>
          <DatePicker
            fromSelectedDate={fromSelectedDate}
            setFromSelectedDate={setFromSelectedDate}
            ToSelectedDate={ToSelectedDate}
            setToSelectedDate={setToSelectedDate}
          />
        </div>
        <div className={classes.datePickerWrapper}>
          <h4 className={classes.userNameSearchHeader}>
            Search orders by User name:
          </h4>
          <form>
            <TextField
              id="userName"
              label="User Name"
              color="primary"
              onChange={nameChangeHandler}
            />
          </form>
        </div>
        <Paper className={classes.tablePadding}>
          {isLoading && (
            <div className="center">
              <LoadingSpinner
                style={{ display: "flex", alignItems: "center" }}
              />
            </div>
          )}
          {!isLoading && orders && users && (
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    {columnsTable.map((column) => (
                      <TableCell
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
                      return (
                        <OrderListItems
                          key={order.id}
                          item={order}
                          users={users}
                        />
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
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
      </Card>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: getAuthToken(state),
    adminId: getAuthUserId(state),
    orders: getAllOrders(state),
    orderIsDone: getIsDone(state),
    loading: getAllOrdersLoading(state),
    ordersError: getAllOrdersError(state),
    users: getUsers(state),
    userLoading: getUsersLoading(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrdersByDate: ({ token, adminId, fromSelectedDate, ToSelectedDate }) =>
      dispatch(
        adminActions.getOrdersByDateRequest({
          token,
          adminId,
          fromSelectedDate,
          ToSelectedDate,
        })
      ),
    getUsers: () => dispatch(usersActions.getUsersRequest()),
    getOrdersByUserName: ({ token, adminId, userName }) =>
      dispatch(
        adminActions.getOrdersByUserNameRequest({ token, adminId, userName })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderManage);
