import * as actionTypes from "../actionTypes";

export const userMessagesRequest = ({ userId, token }) => ({
  type: actionTypes.USER_MESSAGES_REQUEST,
  payload: {
    userId,
    token,
  },
});

export const userMessagesSuccess = (items, count) => ({
  type: actionTypes.USER_MESSAGES_SUCCESS,
  payload: {
    items,
    count,
  },
});

export const userMessagesFailure = (error) => ({
  type: actionTypes.USER_MESSAGES_FAILURE,
  payload: {
    error,
  },
});

export const userSeenMessageRequest = ({ token, userId, messageId }) => ({
  type: actionTypes.USER_SEEN_MESSAGE_REQUEST,
  payload: {
    token,
    userId,
    messageId,
  },
});

export const userSeenMessageSuccess = (item) => ({
  type: actionTypes.USER_SEEN_MESSAGE_SUCCESS,
  payload: {
    item,
  },
});

export const userSeenMessageFailure = (error) => ({
  type: actionTypes.USER_SEEN_MESSAGE_FAILURE,
  payload: {
    error,
  },
});

export const messageDeleteRequest = ({ token, messageId }) => ({
  type: actionTypes.DELETE_MESSAGE_REQUEST,
  payload: {
    token,
    messageId,
  },
});

export const messageDeleteSuccess = (messageId) => ({
  type: actionTypes.DELETE_MESSAGE_SUCCESS,
  payload: {
    messageId,
  },
});

export const messageDeleteFailure = (error) => ({
  type: actionTypes.DELETE_MESSAGE_FAILURE,
  payload: {
    error,
  },
});
