import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { userMessagesRequest } from "../../../store/actions";
import {
  getAuthToken,
  getAuthUserId,
  getMessagesLoading,
  getMessages,
  getErrorMessage,
} from "../../../store/selectors";


import InboxDrawer from "./InboxDrawer";
import InboxMessageList from "./InboxMessageList";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../../common/UIElements/Card";
import ErrorModal from "../../common/UIElements/ErrorModal";
import LoadingSpinner from "../../common/UIElements/LoadingSpinner";

const useStyles = makeStyles((theme) => ({
  cardWrapper: {
    width: "90%",
    maxWidth: "65rem",
    margin: "1rem auto",
    display: "flex",
    justifyContent: "space-between",
  },
  inboxMessageWrapper: {
    width: "74%",
    height: "100%",
    padding: 0,
  },
  drawerWrapper: {
    height: "100%",
  },
}));

const InboxMessages = ({
  userId,
  token,
  getUserMessages,
  messages,
  loading,
  error,
}) => {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, SetIsLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      SetIsLoading(true);
      // getUserMessages({ token, userId });
    } else {
      SetIsLoading(false);
    }
    error && setErrorMessage(error);
  }, [error, getUserMessages, loading, token, userId]);

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
      {!isLoading && messages && (
        <div className={classes.cardWrapper}>
          <Card className={classes.drawerWrapper}>
            <InboxDrawer />
          </Card>
          <Card className={classes.inboxMessageWrapper}>
            <InboxMessageList items={messages} />
          </Card>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: getAuthUserId(state),
    token: getAuthToken(state),
    loading: getMessagesLoading(state),
    messages: getMessages(state),
    error: getErrorMessage(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserMessages: ({ userId, token }) =>
      dispatch(userMessagesRequest({ userId, token })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InboxMessages);
