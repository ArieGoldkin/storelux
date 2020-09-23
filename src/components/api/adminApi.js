import axios from "axios";

export const deleteProducts = ({ products, adminId, token }) => {
  return axios.delete(`/api/admin/deleteitems`, {
    headers: {
      Authorization: "Bearer " + token,
    },
    data: { products, adminId },
  });
};
