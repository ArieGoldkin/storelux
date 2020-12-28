import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useItemStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "set",
    },
  },
  notVisible: {
    display: "none",
    borderBottom: "set",
  },
  Visible: {
    display: "table-row",
  },
});

const UserOrdersList = ({ item }) => {
  const [open, setOpen] = useState(false);
  const classes = useItemStyles();

  const convertToLocalDate = (date) => {
    return new Date(date).toLocaleDateString("he-IL");
  };

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {item.id}
        </TableCell>
        <TableCell align="left">{item.email}</TableCell>
        <TableCell align="left">{item.shippmentAddress}</TableCell>
        <TableCell align="left">{item.contactPhone}</TableCell>
        <TableCell align="left">{convertToLocalDate(item.createdAt)}</TableCell>
        <TableCell align="left">
          {item.orderSummary.map((summary) => `$${summary.totalSum}`)}
        </TableCell>
      </TableRow>
      <TableRow
        className={open === false ? classes.notVisible : classes.Visible}
      >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Products
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Product ID</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {item.products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell component="td" scope="row">
                        {product.id}
                      </TableCell>
                      <TableCell>{product.title}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>{product.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default UserOrdersList;
