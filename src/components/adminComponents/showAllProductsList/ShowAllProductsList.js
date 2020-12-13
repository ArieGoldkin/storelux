import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import ErrorModal from "../../common/UIElements/ErrorModal";
import LoadingSpinner from "../../common/UIElements/LoadingSpinner";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import ShowAllProductsItem from "./ShowAllProductsItem";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import { stableSort, getComparator } from "./TableHelpFunctions";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";

import { useStyles } from "./tableStyle";
import { columnsData } from "./tableColumnsData";
import {
  getAllProducts,
  getLoading,
  getError,
} from "../selectors/AllProductsSelectors";
import {
  getAuthUserId,
  getAuthToken,
} from "../../userComponents/selectors/AuthSelectors";
import {
  getUsers,
  getUsersError,
} from "../../userComponents/selectors/UserSelectors";
import { getAllProductsRequest } from "../adminActions/adminActions";
import { getUsersRequest } from "../../userComponents/usersActions/UserActions";

const theme = createMuiTheme({
  overrides: {
    MuiTableRow: {
      root: {
        "&$selected": {
          backgroundColor: "#EAECF7",
        },
        "&:hover": {
          backgroundColor: "#EAECF7",
        },
      },
    },
  },
  palette: {
    primary: {
      light: "#6fbf73",
      main: "##f44336",
      dark: "#ba000d",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f44336",
    },
  },
});

const ShowAllProductsList = ({
  products,
  users,
  loading,
  loadAllProducts,
  loadUsers,
  productsError,
  usersError,
  adminId,
  token,
}) => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");
  const [selected, setSelected] = useState([]);
  // console.log(selected);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = products.map((product) => product.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, productId) => {
    const selectedIndex = selected.indexOf(productId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, productId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
      loadAllProducts({ adminId, token });
      loadUsers();
    } else {
      setIsLoading(false);
    }
  }, [adminId, loadAllProducts, loadUsers, loading, token]);

  useEffect(() => {
    if (usersError) {
      setErrorMessage(usersError.error);
    }
    if (productsError) {
      setErrorMessage(productsError.error);
    }
  }, [productsError, usersError]);

  const clearError = () => {
    setErrorMessage(null);
  };

  return (
    <>
      <ErrorModal error={errorMessage} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && products && users && (
        <div className={classes.tableWrapper}>
          <Paper className={classes.root} elevation={3}>
            <EnhancedTableToolbar
              numSelected={selected.length}
              selectedItems={selected}
            />
            <TableContainer component={Paper} className={classes.tableHeight}>
              <Table
                className={classes.table}
                stickyHeader
                aria-label="sticky table"
                aria-labelledby="tableTitle"
              >
                <EnhancedTableHead
                  classes={classes}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={products.length}
                  columns={columnsData}
                />
                <TableBody>
                  {stableSort(products, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((product, index) => {
                      const isItemSelected = isSelected(product.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <MuiThemeProvider theme={theme} key={product.id}>
                          <TableRow
                            hover
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={product.id}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                className={classes.checkBox}
                                onClick={(event) =>
                                  handleClick(event, product.id)
                                }
                                color="default"
                                checked={isItemSelected}
                                inputProps={{ "aria-labelledby": labelId }}
                              />
                            </TableCell>
                            <ShowAllProductsItem
                              place={index}
                              key={product.id}
                              productId={product.id}
                              title={product.title}
                              owner={users.map((user) =>
                                user.id === product.creator
                                  ? user.firstName + " " + user.lastName
                                  : null
                              )}
                              category={product.category}
                              price={product.price}
                              units={product.units}
                              available={product.active}
                              image={`${process.env.REACT_APP_BACKEND_URL}/${product.image}`}
                            />
                          </TableRow>
                        </MuiThemeProvider>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={products.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: getAllProducts(state),
    loading: getLoading(state),
    users: getUsers(state),
    usersError: getUsersError(state),
    productsError: getError(state),
    adminId: getAuthUserId(state),
    token: getAuthToken(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAllProducts: ({ adminId, token }) =>
      dispatch(getAllProductsRequest({ adminId, token })),
    loadUsers: () => dispatch(getUsersRequest()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowAllProductsList);
