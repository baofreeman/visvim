const setUser = (payload) => {
  return {
    type: "SET_USER",
    payload: payload,
  };
};

const setToken = (payload) => {
  return {
    type: "SET_TOKEN",
    payload: payload,
  };
};

const logoutUser = (payload) => {
  return {
    type: "LOGOUT_USER",
    payload: payload,
  };
};

export { setUser, logoutUser, setToken };
