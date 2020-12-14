import axios from "axios";

export const addOrder = ({
  userId,
  token,
  items,
  firstName,
  email,
  address,
  phone,
  orderSummary,
}) => {
  return axios.post(
    `/api/orders/${userId}/neworder`,
    { items, firstName, email, address, phone, orderSummary },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
