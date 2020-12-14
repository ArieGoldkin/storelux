import axios from "axios";

export const getCategories = () => {
  return axios.get("/api/categories");
};

export const addCategory = ({ adminId, token, name }) => {
  return axios.post(
    "/api/categories/addcategory",
    { adminId, name },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
