import React from "react";
import Shop from "../Shop/Shop";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { setUser } from "../../redux/actions/user";

const Main = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserDetail = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        const res = await axiosPrivate.get(`/user/get-detail-user/${userId}`);
        console.log(res[0]);
        dispatch(setUser({ user: res[0] }));
      }
    };
    getUserDetail();
  }, []);

  const Cart = useSelector((state) => state.cartReducer.cart);
  useEffect(() => {
    localStorage.setItem("cartVisvim", JSON.stringify(Cart));
  }, [Cart.length]);

  return (
    <Layout>
      <Shop />
    </Layout>
  );
};

export default Main;
