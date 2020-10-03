import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { columnsTable } from "./TableColumns";
import { useStyle } from "./OrderManageStyle";
import * as adminActions from "../adminActions/adminActions";
import * as usersActions from "../../userComponents/usersActions/UserActions";
import * as allOrdersSelectors from "../selectors/AllOrdersSelectors";
import * as authSelectors from "../../userComponents/selectors/AuthSelectors";
import * as usersSelectors from "../../userComponents/selectors/UserSelectors";
import Card from "../../common/UIElements/Card";
import LoadingSpinner from "../../common/UIElements/LoadingSpinner";
import DatePicker from "../../common/FormElements/DatePicker";
// import ErrorModal from "../../common/UIElements/ErrorModal";
import Paper from "@material-ui/core/Paper";
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
  getAllOrders,
  loading,
  orders,
  users,
  getUsers,
  userLoading,
}) => {
  const classes = useStyle();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [fromSelectedDate, setFromSelectedDate] = useState(new Date());
  const [ToSelectedDate, setToSelectedDate] = useState(new Date());
  // console.log(fromSelectedDate);
  // console.log(ToSelectedDate);

  // const filteredOrders = orders
  //   .filter(
  //     (order) =>
  //       new Date(order.createdAt) >= fromSelectedDate &&
  //       new Date(order.createdAt) <= ToSelectedDate
  //   )
  //   .map((order) => order);
  // const filteredData = orders.map((order) => new Date(order.createdAt));
  // console.log(filteredOrders);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    getAllOrders({ token, adminId, fromSelectedDate, ToSelectedDate });
  }, [ToSelectedDate, adminId, fromSelectedDate, getAllOrders, token]);

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

  return (
    <>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && orders && users && (
        <Card className={classes.tableWrapper}>
          <div className={classes.datePickerWrapper}>
            <h4 className={classes.datePickerHeader}>
              Select orders date range:
            </h4>
            <DatePicker
              fromSelectedDate={fromSelectedDate}
              setFromSelectedDate={setFromSelectedDate}
              ToSelectedDate={ToSelectedDate}
              setToSelectedDate={setToSelectedDate}
            />
          </div>
          <Paper className={classes.tablePadding}>
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
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: authSelectors.getAuthToken(state),
    adminId: authSelectors.getAuthUserId(state),
    orders: allOrdersSelectors.getAllOrders(state),
    orderIsDone: allOrdersSelectors.getIsDone(state),
    loading: allOrdersSelectors.getAllOrdersLoading(state),
    users: usersSelectors.getUsers(state),
    userLoading: usersSelectors.getUsersLoading(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllOrders: ({ token, adminId, fromSelectedDate, ToSelectedDate }) =>
      dispatch(
        adminActions.getAllOrdersRequest({
          token,
          adminId,
          fromSelectedDate,
          ToSelectedDate,
        })
      ),
    getUsers: () => dispatch(usersActions.getUsersRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderManage);
