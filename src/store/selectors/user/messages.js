export const getMessagesLoading = (state) =>
  state.userProfile.userMessages.messagesLoading;

export const getMessages = (state) => state.userProfile.userMessages.items;

export const getNumberOfMes = (state) => state.userProfile.messageIcon.count;

export const getCounterLoading = (state) =>
  state.userProfile.messageIcon.counterLoading;

export const getItemLoading = (state) =>
  state.userProfile.userMessages.messageItemLoading;

export const getErrorMessage = (state) =>
  state.userProfile.userMessages.messagesError;
