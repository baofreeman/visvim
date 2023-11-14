import axios from "./axios";

const getAllProducts = async (token) => {
  const res = await axios.get("/product", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res?.data;
};

const getProduct = async (token, id) => {
  const res = await axios.get(`/product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res?.data;
};

const editProduct = async (token, id) => {
  const res = await axios.put(`/product/${id}`, {
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  return res?.data;
};

const createProduct = async (token, data) => {
  console.log(data);
  const res = await axios.post("/product", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res?.data;
};

const deleteProduct = async (token, id) => {
  const res = await axios.delete(`/product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res?.data;
};

export {
  getAllProducts,
  createProduct,
  getProduct,
  editProduct,
  deleteProduct,
};
