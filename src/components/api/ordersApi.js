import axios from "axios";

export const addOrder = ({
  userId,
  token,
  product,
  firstName,
  email,
  address,
  phone,
  orderSummary,
}) => {
  return axios.post(
    `/api/orders/${userId}/neworder`,
    { product, firstName, email, address, phone, orderSummary },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
