import axios from "axios";

export const getCartByUserId = ({ userId, token }) => {
  return axios.get(`/api/shoppingCart/${userId}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const updateProductQuantity = ({
  userId,
  token,
  productId,
  quantity,
}) => {
  return axios.patch(
    `/api/shoppingCart/${userId}`,
    { productId, quantity },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const deleteProductFromCart = (token, userId, productId) => {
  return axios.delete(`/api/shoppingCart/${userId}/${productId}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const deleteAllProductsFromCart = (token, userId, products) => {
  return axios.delete(`/api/shoppingCart/${userId}/summary`, {
    headers: {
      Authorization: "Bearer " + token,
    },
    data: { products },
  });
};

export const addProductToCart = ({
  userId,
  token,
  productId,
  quantity,
  title,
  category,
  price,
  units,
  description,
  image,
}) => {
  return axios.post(
    `/api/shoppingCart/${userId}`,
    { productId, quantity, title, category, price, units, description, image },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};