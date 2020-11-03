import { takeLatest, call, fork, put, take } from "redux-saga/effects";
import * as api from "../../api/usersApi";
import * as actions from "../usersActions/UserMessagesAction";
import { activeMessages } from "../../common/util/calculateActiveMessages";
import { toast } from "react-toastify";

function* getUserMessages(action) {
  try {
    const responseData = yield call(api.getUserMessages, {
      token: action.payload.token,
      userId: action.payload.userId,
    });
    const countMes = yield activeMessages(responseData.data.messages);
    yield put(
      actions.userMessagesSuccess(responseData.data.messages, countMes)
    );
  } catch (e) {
    yield put(
      actions.userMessagesFailure({
        error: e.response.data.message,
      })
    );
  }
}

function* watchGetUserMessagesRequest() {
  yield takeLatest(actions.Types.USER_MESSAGES_REQUEST, getUserMessages);
}

function* userMessageSeen(action) {
  try {
    const responseData = yield call(api.userSeenMessage, {
      token: action.payload.token,
      userId: action.payload.userId,
      messageId: action.payload.messageId,
    });
    yield put(actions.userSeenMessageSuccess(responseData.data.message));
  } catch (e) {
    yield put(
      actions.userSeenMessageFailure({
        error: e.response.data.message,
      })
    );
  }
}

function* watchUserMessageSeenRequest() {
  yield takeLatest(actions.Types.USER_SEEN_MESSAGE_REQUEST, userMessageSeen);
}

function* deleteMessageRequest({ token, messageId }) {
  try {
    yield call(api.deleteMessage, { token, messageId });
    yield put(actions.messageDeleteSuccess(messageId));
    yield toast.info("Message successfully deleted.");
  } catch (e) {
    yield put(
      actions.messageDeleteFailure({
        error: e.response.data.message,
      })
    );
  }
}

function* watchDeleteMessageRequest() {
  while (true) {
    const deleteAction = yield take(actions.Types.DELETE_MESSAGE_REQUEST);
    yield call(deleteMessageRequest, {
      token: deleteAction.payload.token,
      messageId: deleteAction.payload.messageId,
    });
  }
}

const userMessageSagas = [
  fork(watchGetUserMessagesRequest),
  fork(watchUserMessageSeenRequest),
  fork(watchDeleteMessageRequest),
];

export default userMessageSagas;
