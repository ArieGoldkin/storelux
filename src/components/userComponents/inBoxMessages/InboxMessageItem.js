import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { getAuthToken, getItemLoading } from "../../../store/selectors";

import {
  getProductRequest,
  messageDeleteRequest,
} from "../../../store/actions";

import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";
import Link from "@material-ui/core/Link";

const InboxMessageItem = (props) => {
  const { token, deleteMessage, index, loading, getProductInfo } = props;
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [loadingItem, setLoadingItem] = useState(null);

  const deleteHandler = () => {
    const messageId = props.id;
    deleteMessage({ token, messageId });
    setLoadingItem(index);
    setIsLoading(true);
  };

  const handleRedirect = () => {
    getProductInfo(props.productId);
    history.push(`/product/${props.productId}`);
  };

  useEffect(() => {
    loading ? setIsLoading(true) : setIsLoading(false);
  }, [loading]);

  return (
    <>
      <AccordionDetails className={props.infoStyle}>
        <Typography>{props.content}</Typography>
        <Link onClick={handleRedirect}>Watch Product Info</Link>
      </AccordionDetails>
      <div className={props.btnWrapper}>
        {index === loadingItem && isLoading ? (
          <div>
            <CircularProgress size={40} />
          </div>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            className={props.button}
            onClick={deleteHandler}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        )}
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    token: getAuthToken(state),
    loading: getItemLoading(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteMessage: ({ token, messageId }) =>
      dispatch(messageDeleteRequest({ token, messageId })),
    getProductInfo: (productId) => dispatch(getProductRequest(productId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InboxMessageItem);
