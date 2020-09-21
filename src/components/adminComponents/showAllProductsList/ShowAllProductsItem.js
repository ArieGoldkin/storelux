import React from "react";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "../../common/UIElements/Avatar";

const useStyles = makeStyles({
  imageCellSize: {
    width: "7rem",
    height: " 6rem",
    padding: "0.5rem 1rem",
  },
});

const ShowAllProductsItem = (props) => {
  const classes = useStyles();
  return (
    <>
      <TableCell align="left" className={classes.imageCellSize}>
        <Avatar
          className="image_radius"
          image={props.image}
          alt={props.title}
        />
      </TableCell>
      <TableCell component="th" id={props.labelId} scope="row" padding="none">
        {props.title}
      </TableCell>
      <TableCell align="left">{props.owner}</TableCell>
      <TableCell align="left">{props.category}</TableCell>
      <TableCell align="left">{props.price + "$"}</TableCell>
      <TableCell align="left">{props.units}</TableCell>
    </>
  );
};

export default ShowAllProductsItem;
