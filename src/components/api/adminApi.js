import axios from "axios";

export const getData = ({ token }) => {
  return axios.get(`/api/admin/globaldata`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const getAllOrders = ({ token, adminId, fromDate, toDate }) => {
  return axios.post(
    `/api/admin/allorders`,
    { adminId, fromDate, toDate },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

// export const getAllOrders = ({ token, adminId }) => {
//   return axios.post(
//     `/api/admin/allorders`,
//     { adminId },
//     {
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//     }
//   );
// };

export const updateRate = ({ vatRate, adminId, token }) => {
  return axios.patch(
    `/api/admin/updaterate`,
    { vatRate, adminId },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const deleteProducts = ({ products, adminId, token }) => {
  return axios.delete(`/api/admin/deleteitems`, {
    headers: {
      Authorization: "Bearer " + token,
    },
    data: { products, adminId },
  });
};
