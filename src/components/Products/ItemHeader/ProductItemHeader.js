import React from "react";

import { CardHeader, Menu, MenuItem, Avatar } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";

const options = ["user products"];
const ITEM_HEIGHT = 48;

const ProductItemHeader = (props) => {
  return (
    <CardHeader
      avatar={<Avatar aria-label="recipe" src={props.image} />}
      action={
        <>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={props.click}
          >
            <MoreVertIcon color="primary" />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={props.anchorEl}
            keepMounted
            open={props.open}
            onClose={props.close}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            }}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                selected={option === "Pyxis"}
                onClick={props.moveToUserClick}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </>
      }
      title={props.creatorName}
      subheader={props.uploadDate}
    />
  );
};

export default ProductItemHeader;
