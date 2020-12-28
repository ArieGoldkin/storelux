import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  getOrdersByDateRequest,
  getOrdersByUserNameRequest,
  getUsersRequest,
  clearOrdersByDataError,
} from "../../../store/actions";
import {
  getAllOrders,
  getIsDone,
  getAllOrdersLoading,
  getAllOrdersError,
  getAuthToken,
  getAuthUserId,
  getUsers,
  getUsersLoading,
} from "../../../store/selectors";

import { columnsTable } from "./TableColumns";
import { useStyle } from "./OrderManageStyle";
import Card from "../../../components/common/UIElements/Card";
import Button from "../../../components/common/FormElements/Button";
import LoadingSpinner from "../../../components/common/UIElements/LoadingSpinner";
import ErrorModal from "../../../components/common/UIElements/ErrorModal";
import DatePicker from "../../../components/common/FormElements/DatePicker";
import { Paper, TextField } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import OrderListItems from "../../../components/Admin/OrdersManage/OrderListItem";

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
  clearErrorMessage,
}) => {
  const classes = useStyle();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [fromSelectedDate, setFromSelectedDate] = useState(new Date());
  const [ToSelectedDate, setToSelectedDate] = useState(new Date());
  const [userName, setUserName] = useState();

  const nameChangeHandler = (event) => {
    event.preventDefault();
    setUserName(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getOrdersByDateHandler = () => {
    getOrdersByDate({ token, adminId, fromSelectedDate, ToSelectedDate });
  };

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
    const timer = setTimeout(() => {
      getOrdersByUserName({ token, adminId, userName });
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [adminId, getOrdersByUserName, token, userName]);

  const clearError = () => {
    clearErrorMessage();
  };

  let errorMessage = null;
  if (ordersError) {
    errorMessage = ordersError.error;
  }
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
          <Button
            onClick={getOrdersByDateHandler}
            buttonClass={classes.dataPickerBtn}
          >
            Find Orders by date
          </Button>
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
        getOrdersByDateRequest({
          token,
          adminId,
          fromSelectedDate,
          ToSelectedDate,
        })
      ),
    getUsers: () => dispatch(getUsersRequest()),
    getOrdersByUserName: ({ token, adminId, userName }) =>
      dispatch(getOrdersByUserNameRequest({ token, adminId, userName })),
    clearErrorMessage: () => dispatch(clearOrdersByDataError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderManage);
