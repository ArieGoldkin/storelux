import axios from "axios";

const UsersAPI = "/api/users";

export const getUsers = () => {
  return axios.get(UsersAPI);
};
export const createUser = ({ firstName, lastName, email, password }) => {
  return axios.post(`${UsersAPI}/signup`, {
    firstName,
    lastName,
    email,
    password,
  });
};

export const loginUser = ({ email, password }) => {
  return axios.post(`${UsersAPI}/login`, {
    email,
    password,
  });
};

export const getUserData = ({ userId }) => {
  return axios.get(`${UsersAPI}/${userId}`);
};

export const updateUserData = ({ userId, formData }) => {
  return axios.patch(`${UsersAPI}/${userId}`, formData);
};

export const resetUserPassword = ({ email }) => {
  return axios.post(`${UsersAPI}/resetPassword`, {
    email,
  });
};

export const updateUserPassword = ({ resetToken, password }) => {
  return axios.post(`${UsersAPI}/updatePassword`, {
    password,
    resetToken,
  });
};

export const getUserOrders = ({ token, userId }) => {
  return axios.post(
    `${UsersAPI}/userOrders`,
    { userId },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const getOrdersByDate = ({ token, userId, fromDate, toDate }) => {
  return axios.post(
    `${UsersAPI}/userOrdersByDate`,
    { userId, fromDate, toDate },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const getUserSoldItems = ({ token, userId }) => {
  return axios.post(
    `${UsersAPI}/getUserSoldItems`,
    { userId },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const getUserMessages = ({ token, userId }) => {
  return axios.post(
    `${UsersAPI}/getUserMessages`,
    { userId },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const userSeenMessage = ({ token, userId, messageId }) => {
  return axios.post(
    `${UsersAPI}/userMessageSeen`,
    { userId, messageId },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const deleteMessage = ({ token, messageId }) => {
  return axios.delete(`${UsersAPI}/deleteMessage/${messageId}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
