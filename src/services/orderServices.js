import axios from "./axios";

const createOrder = async (data) => {
  const res = await axios.post("/order", data);
  return res?.data;
};

export { createOrder };
