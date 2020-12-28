import React from "react";

import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const ProductItemContent = (props) => {
  const { classes } = props;
  return (
    <CardContent className={classes.textContent}>
      <div className={classes.productTitle}>
        <Typography align="left" variant="h6" component="h2">
          {props.title}
        </Typography>
        <Typography align="left" variant="h6" component="h2">
          {`$${props.price}`}
        </Typography>
      </div>
      <Typography
        align="left"
        variant="body2"
        color="textSecondary"
        component="p"
      >
        {props.description}
      </Typography>
    </CardContent>
  );
};

export default ProductItemContent;
