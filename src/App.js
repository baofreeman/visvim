import { Routes, Route, json } from "react-router-dom";
import { Main, Shop, Cart, Checkout } from "./pages";
import Detail from "./components/Detail/Detail";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { setUser } from "./redux/actions/user";
import { getUser, refresh } from "./services/userServices";
import axios, { axiosJWT } from "./services/axios";
import { isJSonString } from "./until/check";
import useRefreshToken from "./hooks/useRefreshToken";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import Admin from "./pages/Admin/Admin.js";
function App() {
  // const axiosPrivate = useAxiosPrivate();
  // const User = useSelector((state) => state.userReducer.user);
  // const Token = useSelector((state) => state.userReducer.token);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   getUserDetail();
  // }, []);

  // const getUserDetail = async () => {
  //   const userId = localStorage.getItem("userId");
  //   if (userId) {
  //     const res = await axiosPrivate.get(`/user/get-detail-user/${userId}`);
  //     console.log(res);
  //     dispatch(setUser({ user: res[0] }));
  //   }
  // };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}></Route>

        <Route path="/admin" element={<Admin />}></Route>

        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/shop" element={<Shop />}>
          <Route path="collections" element={<Shop />} />
          <Route path="categogy/:category" element={<Shop />} />
        </Route>
        <Route path="shop/:productId" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
      </Routes>
    </div>
  );
}

export default App;
