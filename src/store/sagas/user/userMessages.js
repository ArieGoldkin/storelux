import { call, put } from "redux-saga/effects";
import * as api from "../../../api";
import * as actions from "../../actions";
import { activeMessages } from "../../../components/common/util/calculateActiveMessages";
import { toast } from "react-toastify";

export function* getUserMessages(action) {
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

export function* userMessageSeen(action) {
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
export function* deleteMessageRequest({ token, messageId }) {
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