const initialValue = {
  user: null,
  token: null,
};

const userReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "SET_USER": {
      const { user, token } = action.payload;
      return {
        ...state,
        user: user,
      };
    }

    case "SET_TOKEN": {
      const { user, token } = action.payload;
      return {
        ...state,
        token: token,
      };
    }
    case "LOGOUT_USER": {
      return {
        token: null,
        user: null,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
