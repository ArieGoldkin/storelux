import React from "react";

import { Button } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";

const ProductItemFooter = (props) => {
  return (
    <CardActions>
      <Button size="small" color="primary" onClick={props.addToCart}>
        Add to cart
      </Button>
      <Button size="small" color="primary" onClick={props.openProduct}>
        View more
      </Button>
    </CardActions>
  );
};

export default ProductItemFooter;
