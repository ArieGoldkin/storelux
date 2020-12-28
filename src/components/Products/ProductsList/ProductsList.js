import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import ProductsItem from "../../../containers/Products/ProductsItem/ProductsItem";
import Card from "../../common/UIElements/Card";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "break-spaces",
    height: "100%",
    marginBottom: theme.spacing(1),
  },
  noItemsWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
}));

const ProductsList = ({ products, users }) => {
  const classes = useStyles();

  if (products.length === 0) {
    return (
      <div className={classes.noItemsWrapper}>
        <Card>
          <h3>Could not find Products for this search</h3>
        </Card>
      </div>
    );
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      {products.map((product, index) => {
        return (
          <ProductsItem
            className={classes.paper}
            place={index}
            key={product.id}
            id={product.id}
            creatorId={product.creator}
            active={product.active}
            image={`${process.env.REACT_APP_BACKEND_URL}/${product.image}`}
            title={product.title}
            creatorName={users.map((user) =>
              user.id === product.creator
                ? user.firstName + " " + user.lastName
                : null
            )}
            userImage={users.map(
              (user) =>
                user.id === product.creator &&
                `${process.env.REACT_APP_BACKEND_URL}/${user.image}`
            )}
            category={product.category}
            price={product.price}
            units={product.units}
            description={product.description}
            uploadDate={product.createdAt}
          />
        );
      })}
    </Grid>
  );
};

export default ProductsList;
