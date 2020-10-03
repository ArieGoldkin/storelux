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
