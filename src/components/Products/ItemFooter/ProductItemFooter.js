import React from "react";

import { Button } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import BoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import ShoppingCartIcon from "@material-ui/icons/AddShoppingCartRounded";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    justifyContent: "space-between",
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#01579b",
    },
    secondary: {
      main: "#F44336",
    },
  },
});

const ProductItemFooter = (props) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CardActions className={classes.root}>
        <Button
          startIcon={<BoxRoundedIcon />}
          size="small"
          color="primary"
          onClick={props.addToCart}
        >
          Add to cart
        </Button>
        <Button
          endIcon={<ShoppingCartIcon />}
          size="small"
          color="primary"
          onClick={props.openProduct}
        >
          View more
        </Button>
      </CardActions>
    </ThemeProvider>
  );
};

export default ProductItemFooter;
