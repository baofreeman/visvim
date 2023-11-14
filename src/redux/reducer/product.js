const initialValue = {
  products: [],
  product: [],
};

const productReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "ADD_PRODUCTS": {
      return {};
    }
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };

    case "SET_PRODUCT": {
      return {
        ...state,
        product: action.payload,
      };
    }
    default:
      return state;
  }
};

export default productReducer;
