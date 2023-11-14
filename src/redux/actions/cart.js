const setCart = (payload) => {
  return {
    type: "SET_CART",
    payload: payload,
  };
};

const dercCart = (payload) => {
  return {
    type: "DECREMENT_CART",
    payload: payload,
  };
};

const deleteCart = (product, i) => {
  return {
    type: "DELETE_CART",
    payload: { product, i },
  };
};

export { setCart, dercCart, deleteCart };
