export const Types = {
  USER_MESSAGES_REQUEST: "user/USER_MESSAGES_REQUEST",
  USER_MESSAGES_SUCCESS: "user/USER_MESSAGES_SUCCESS",
  USER_MESSAGES_FAILURE: "user/USER_MESSAGES_FAILURE",

  USER_SEEN_MESSAGE_REQUEST: "user/USER_SEEN_MESSAGE_REQUEST",
  USER_SEEN_MESSAGE_SUCCESS: "user/USER_SEEN_MESSAGE_SUCCESS",
  USER_SEEN_MESSAGE_FAILURE: "user/USER_SEEN_MESSAGE_FAILURE",

  DELETE_MESSAGE_REQUEST: "user/DELETE_MESSAGE_REQUEST",
  DELETE_MESSAGE_SUCCESS: "user/DELETE_MESSAGE_SUCCESS",
  DELETE_MESSAGE_FAILURE: "user/DELETE_MESSAGE_FAILURE",
};

export const userMessagesRequest = ({ userId, token }) => ({
  type: Types.USER_MESSAGES_REQUEST,
  payload: {
    userId,
    token,
  },
});

export const userMessagesSuccess = (items, count) => ({
  type: Types.USER_MESSAGES_SUCCESS,
  payload: {
    items,
    count,
  },
});

export const userMessagesFailure = (error) => ({
  type: Types.USER_MESSAGES_FAILURE,
  payload: {
    error,
  },
});

export const userSeenMessageRequest = ({ token, userId, messageId }) => ({
  type: Types.USER_SEEN_MESSAGE_REQUEST,
  payload: {
    token,
    userId,
    messageId,
  },
});

export const userSeenMessageSuccess = (item) => ({
  type: Types.USER_SEEN_MESSAGE_SUCCESS,
  payload: {
    item,
  },
});

export const userSeenMessageFailure = (error) => ({
  type: Types.USER_SEEN_MESSAGE_FAILURE,
  payload: {
    error,
  },
});

export const messageDeleteRequest = ({ token, messageId }) => ({
  type: Types.DELETE_MESSAGE_REQUEST,
  payload: {
    token,
    messageId,
  },
});

export const messageDeleteSuccess = (messageId) => ({
  type: Types.DELETE_MESSAGE_SUCCESS,
  payload: {
    messageId,
  },
});

export const messageDeleteFailure = (error) => ({
  type: Types.DELETE_MESSAGE_FAILURE,
  payload: {
    error,
  },
});
