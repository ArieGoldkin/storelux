import axios from "axios";

export const getProducts = () => {
  return axios.get("/api/products");
};

export const findProductByTitle = ({ title }) => {
  return axios.post("/api/products/searchByTitle", {
    title,
  });
};

export const findProductsByCategory = ({ category }) => {
  return axios.post(`/api/products/searchByCategory`, { category });
};

export const createProduct = ({ token, formData }) => {
  return axios.post("/api/products", formData, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const getUserProducts = ({ userId }) => {
  return axios.get(`/api/products/user/${userId}`);
};

export const deleteProduct = (token, productId) => {
  return axios.delete(`/api/products/${productId}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const getProductById = ({ productId }) => {
  return axios.get(`/api/products/${productId}`);
};

export const updateProduct = ({ token, productId, formData }) => {
  return axios.patch(`/api/products/${productId}`, formData, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
