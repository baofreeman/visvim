const addProducts = (payload) => {
  return {
    type: "ADD_PRODUCTS",
    payload: payload,
  };
};

const setProducts = (payload) => {
  return {
    type: "SET_PRODUCTS",
    payload: payload,
  };
};

const setProduct = (payload) => {
  return {
    type: "SET_PRODUCT",
    payload: payload,
  };
};

export { addProducts, setProducts, setProduct };
