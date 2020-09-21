import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import ErrorModal from "../../common/UIElements/ErrorModal";
import LoadingSpinner from "../../common/UIElements/LoadingSpinner";
import { makeStyles } from "@material-ui/core/styles";
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

import * as productSelectors from "../../productComponents/selectors/AllProductsSelectors";
import * as userSelectors from "../../userComponents/selectors/UserSelectors";
import * as productsAction from "../../productComponents/productsActions/productsActions";
import * as usersAction from "../../userComponents/usersActions/UserActions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  tableHead: {
    fontWeight: "bold",
    fontSize: "1.7vh",
  },
  tableWrapper: {
    width: "60%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-around",
    marginTop: "1rem",
  },
  tableHeight: {
    height: "40rem",
  },
}));

const columns = [
  { id: "image", align: "left" },
  { id: "title", label: "Product Title", minWidth: 170, align: "left" },
  { id: "owner", label: "Owner", minWidth: 100, align: "left" },
  {
    id: "category",
    label: "Category",
    minWidth: 100,
    align: "left",
  },
  {
    id: "price",
    label: "Price",
    minWidth: 100,
    align: "left",
  },
  {
    id: "units",
    label: "Units",
    minWidth: 65,
    align: "left",
    format: (value) => value.toFixed(2),
  },
];

const ShowAllProductsList = ({
  products,
  users,
  loading,
  loadProducts,
  loadUsers,
  productsError,
  usersError,
}) => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");
  const [selected, setSelected] = useState([]);
  console.log(selected);

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
      const newSelecteds = products.map((n) => n.name);
      setSelected(newSelecteds);
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
      loadProducts();
      loadUsers();
    } else {
      setIsLoading(false);
    }
  }, [loadProducts, loadUsers, loading]);

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
          <Paper className={classes.root}>
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
                  columns={columns}
                />
                <TableBody>
                  {stableSort(products, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((product, index) => {
                      const isItemSelected = isSelected(product.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, product.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={product.title}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </TableCell>
                          <ShowAllProductsItem
                            key={product.title}
                            title={product.title}
                            owner={users.map((user) =>
                              user.id === product.creator
                                ? user.firstName + " " + user.lastName
                                : null
                            )}
                            category={product.category}
                            price={product.price}
                            units={product.units}
                            image={`${process.env.REACT_APP_BACKEND_URL}/${product.image}`}
                          />
                        </TableRow>
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
    products: productSelectors.getProducts(state),
    loading: productSelectors.getProductsLoading(state),
    users: userSelectors.getUsers(state),
    usersError: userSelectors.getUsersError(state),
    productsError: productSelectors.getProductsError(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadProducts: () => dispatch(productsAction.getProductsRequest()),
    loadUsers: () => dispatch(usersAction.getUsersRequest()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowAllProductsList);
