import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./Shop.module.scss";
import Collections from "../../components/Collections/Collections";

import { setProducts } from "../../redux/actions/product";
import { useSelector } from "react-redux";
import axios from "../../services/axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { getAllProducts } from "../../services/productServices";

const Shop = () => {
  const ProductList = useSelector((state) => state.productReducer.products);
  const Token = useSelector((state) => state.userReducer.token);
  const [filterProduct, setFilterProduct] = useState();
  const { category } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [Token]);

  const fetchData = async () => {
    try {
      if (Token) {
        const res = await getAllProducts(Token);
        dispatch(setProducts(res?.products));
      }
    } catch (error) {
      navigate("/");
    }
  };

  const filter = (category) => {
    const products = ProductList.filter((item) => item?.category === category);
    setFilterProduct(products);
  };
  useEffect(() => {
    filter(category);
  }, [category]);

  return (
    <div className={styles.container}>
      <Sidebar data={ProductList} />
      <Collections
        data={!filterProduct?.length == 0 ? filterProduct : ProductList}
      />
    </div>
  );
};

export default Shop;
