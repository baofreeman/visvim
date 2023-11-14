const getCartStorage = () => {
  let newCart = localStorage.getItem("cartVisvim");
  if (newCart == []) {
    return [];
  } else if (newCart === null) {
    return [];
  } else {
    const dataCart = JSON.parse(newCart);
    return dataCart;
  }
};

const initialValue = {
  cart: getCartStorage(),
  total: 0,
};

const cartReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "SET_CART": {
      const itemIndex = state.cart.filter((item) => {
        return (
          item._id === action.payload._id && item.size === action.payload.size
        );
      });
      if (itemIndex.length) {
        const items = itemIndex.filter((item) => {
          if (item.size === action.payload.size) {
            item.quantity += 1;
          }
          return item;
        });
        let newCart = JSON.parse(localStorage.getItem("cartVisvim"));
        const itemSize = items.map((item) => item.size);
        newCart.forEach((item) => {
          if (item.size === itemSize[0]) return (item.quantity += 1);
        });
        localStorage.setItem("cartVisvim", JSON.stringify(newCart));

        return {
          ...state,
          cart: [...state.cart],
        };
      } else {
        let newCart = JSON.parse(localStorage.getItem("cartVisvim"));
        let newState = {
          ...action.payload,
          quantity: 1,
        };
        newCart.push(newState);
        localStorage.setItem("cartVisvim", JSON.stringify(newCart));
        return {
          ...state,
          cart: [...state.cart, newState],
        };
      }
    }
    case "DECREMENT_CART":
      const itemIndex = state.cart.filter((item) => {
        if (
          item._id === action.payload._id &&
          item.size === action.payload.size
        ) {
          if (item.size === action.payload.size) {
            if (item.quantity === 1) {
              return (item.quantity = 1);
            }
            item.quantity -= 1;
          }
          return item;
        }
      });
      console.log(itemIndex);
      let newCart = JSON.parse(localStorage.getItem("cartVisvim"));

      localStorage.setItem("cartVisvim", JSON.stringify(newCart));
      return {
        ...state,
        cart: [...state.cart],
      };

    case "DELETE_CART": {
      let newItem = [...state.cart];
      console.log(action.payload);
      // const items = state.cart.filter((item) => {
      //   if (item.size === action.payload.size) {
      //     return item;
      //   }
      // });
      // console.log(items[0]);
      // console.log(newItem);
      newItem.splice(action.payload.i, 1);
      console.log(newItem);
      localStorage.setItem("cartVisvim", JSON.stringify(newItem));
      return {
        ...state,
        cart: newItem,
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
