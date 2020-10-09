import axios from "axios";

const adminAPI = "/api/admin";

export const getData = ({ token }) => {
  return axios.get(`${adminAPI}/globaldata`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const getOrdersByDate = ({ token, adminId, fromDate, toDate }) => {
  return axios.post(
    `${adminAPI}/ordersbydate`,
    { adminId, fromDate, toDate },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const getAllProducts = ({ token, adminId }) => {
  return axios.post(
    `${adminAPI}/allproducts`,
    { adminId },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const getOrdersByUserName = ({ token, adminId, userName }) => {
  return axios.post(
    `${adminAPI}/ordersByUserName`,
    { adminId, userName },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const updateRate = ({ vatRate, adminId, token }) => {
  return axios.patch(
    `${adminAPI}/updaterate`,
    { vatRate, adminId },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const deleteProducts = ({ products, adminId, token }) => {
  return axios.delete(`${adminAPI}/deleteitems`, {
    headers: {
      Authorization: "Bearer " + token,
    },
    data: { products, adminId },
  });
};

export const addCategory = ({ adminId, token, name }) => {
  return axios.post(
    `${adminAPI}/addcategory`,
    { adminId, name },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const productStatusChange = ({ adminId, token, productId }) => {
  return axios.patch(
    `${adminAPI}/statuschange`,
    { adminId, productId },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
