import { Types } from "../usersActions/UserActions";
import { Types as soldItemsActions } from "../usersActions/UserSoldProductsActions";
import { Types as messagesActions } from "../usersActions/UserMessagesAction";
import { updateObject } from "../../store/utility";
import { activeMessages } from "../../common/util/calculateActiveMessages";

const initialState = {
  item: [],
  error: null,
  loading: true,
  isDone: false,
  userOrders: {
    items: [],
    userOrdersLoading: true,
    ordersError: null,
  },
  userSoldItems: {
    items: [],
    soldItemsLoading: true,
    soldItemsError: null,
  },
  messageIcon: {
    count: null,
    counterLoading: true,
  },
  userMessages: {
    items: [],
    messagesLoading: true,
    messagesError: null,
    messageItemLoading: true,
  },
};

const getUserDataStart = (state, action) => {
  return updateObject(state, { error: null, loading: true, isDone: false });
};

const getUserDataSuccess = (state, action) => {
  return updateObject(state, {
    item: action.user,
    error: null,
    loading: false,
    isDone: true,
  });
};

const getUserDataFailure = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    isDone: true,
  });
};
const getOrdersRequest = (state, action) => {
  return updateObject(state, {
    userOrders: {
      userOrdersLoading: true,
    },
  });
};
const getOrdersSuccess = (state, action) => {
  return updateObject(state, {
    userOrders: {
      items: action.payload.items,
      userOrdersLoading: false,
      ordersError: null,
    },
  });
};

const getOrdersFailure = (state, action) => {
  return updateObject(state, {
    userOrders: {
      ordersError: action.payload.error,
      userOrdersLoading: false,
    },
  });
};

const getSoldItemsRequest = (state, action) => {
  return updateObject(state, {
    userSoldItems: {
      soldItemsLoading: true,
    },
  });
};

const getSoldItemsSuccess = (state, action) => {
  return updateObject(state, {
    userSoldItems: {
      items: action.payload.items,
      soldItemsLoading: false,
      soldItemsError: null,
    },
  });
};

const getSoldItemsFailure = (state, action) => {
  return {
    userSoldItems: {
      soldItemsError: action.payload.error,
      soldItemsLoading: false,
    },
  };
};

const userMessagesRequest = (state, action) => {
  return updateObject(state, {
    messageIcon: {
      count: null,
      counterLoading: true,
    },
    userMessages: {
      messagesLoading: true,
      messagesError: null,
    },
  });
};

const userMessagesSuccess = (state, action) => {
  return updateObject(state, {
    messageIcon: {
      count: action.payload.count,
      counterLoading: false,
    },
    userMessages: {
      items: action.payload.items,
      messagesLoading: false,
    },
  });
};

const userMessagesFailure = (state, action) => {
  return updateObject(state, {
    messageIcon: {
      count: null,
      counterLoading: false,
    },
    userMessages: {
      messagesError: action.payload.error.error,
      messagesLoading: false,
    },
  });
};

const userSeenMessageRequest = (state, action) => {
  return updateObject(state, {
    messageIcon: {
      count: null,
      counterLoading: true,
    },
  });
};

const userSeenMessageSuccess = (state, action) => {
  const index = state.userMessages.items.findIndex(
    (item) => item.id === action.payload.item.id
  );
  const newArray = [...state.userMessages.items];
  newArray[index].active = !newArray[index].active;
  const countActive = activeMessages(newArray);
  return updateObject(state, {
    userMessages: {
      items: newArray,
    },
    messageIcon: {
      count: countActive,
      counterLoading: false,
    },
  });
};

const messageDeleteRequest = (state, action) => {
  return updateObject(state, {
    userMessages: {
      items: state.userMessages.items,
      messageItemLoading: true,
    },
  });
};

const messageDeleteSuccess = (state, action) => {
  return updateObject(state, {
    userMessages: {
      items: state.userMessages.items.filter((item) => {
        return !action.payload.messageId.includes(item.id);
      }),
      messageItemLoading: false,
    },
  });
};

const messageDeleteFailure = (state, action) => {
  return updateObject(state, {
    userMessages: {
      messagesError: action.payload.error.error,
      messageItemLoading: false,
    },
  });
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case Types.USER_PROFILE_REQUEST:
      return getUserDataStart(state, action);
    case Types.USER_PROFILE_SUCCESS:
      return getUserDataSuccess(state, action);
    case Types.USER_PROFILE_FAILURE:
      return getUserDataFailure(state, action);
    case Types.USER_UPDATE_REQUEST:
      return getUserDataStart(state, action);
    case Types.USER_UPDATE_SUCCESS:
      return getUserDataSuccess(state, action);
    case Types.USER_UPDATE_FAILURE:
      return getUserDataFailure(state, action);
    case Types.GET_USER_ORDERS_REQUEST:
    case Types.USER_ORDERS_BY_DATE_REQUEST:
      return getOrdersRequest(state, action);
    case Types.GET_USER_ORDERS_SUCCESS:
    case Types.USER_ORDERS_BY_DATE_SUCCESS:
      return getOrdersSuccess(state, action);
    case Types.GET_USER_ORDERS_FAILURE:
    case Types.USER_ORDERS_BY_DATE_FAILURE:
      return getOrdersFailure(state, action);
    case soldItemsActions.GET_USER_SOLD_ITEMS_REQUEST:
      return getSoldItemsRequest(state, action);
    case soldItemsActions.GET_USER_SOLD_ITEMS_SUCCESS:
      return getSoldItemsSuccess(state, action);
    case soldItemsActions.GET_USER_SOLD_ITEMS_FAILURE:
      return getSoldItemsFailure(state, action);
    case messagesActions.USER_MESSAGES_REQUEST:
      return userMessagesRequest(state, action);
    case messagesActions.USER_MESSAGES_SUCCESS:
      return userMessagesSuccess(state, action);
    case messagesActions.USER_MESSAGES_FAILURE:
    case messagesActions.USER_SEEN_MESSAGE_FAILURE:
      return userMessagesFailure(state, action);
    case messagesActions.USER_SEEN_MESSAGE_REQUEST:
      return userSeenMessageRequest(state, action);
    case messagesActions.USER_SEEN_MESSAGE_SUCCESS:
      return userSeenMessageSuccess(state, action);
    case messagesActions.DELETE_MESSAGE_REQUEST:
      return messageDeleteRequest(state, action);
    case messagesActions.DELETE_MESSAGE_SUCCESS:
      return messageDeleteSuccess(state, action);
    case messagesActions.DELETE_MESSAGE_FAILURE:
      return messageDeleteFailure(state, action);
    default:
      return state;
  }
}
