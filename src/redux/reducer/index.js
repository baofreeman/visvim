import { combineReducers } from "redux";
import productReducer from "./product";
import userReducer from "./user";
import cartReducer from "./cart";

const RootReducer = combineReducers({
  productReducer,
  userReducer,
  cartReducer,
});

export default RootReducer;
