export const getMessagesLoading = (state) =>
  state.user.userMessages.messagesLoading;

export const getMessages = (state) => state.user.userMessages.items;

export const getNumberOfMes = (state) => state.user.messageIcon.count;

export const getCounterLoading = (state) =>
  state.user.messageIcon.counterLoading;

export const getItemLoading = (state) =>
  state.user.userMessages.messageItemLoading;
