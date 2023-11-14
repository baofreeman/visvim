import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../../redux/actions/product";
import Layout from "../Layout/Layout";
import styles from "./Detail.module.scss";
import SwiperCustom from "../Swiper/Swiper";
import { SwiperSlide } from "swiper/react";
import cartReducer from "../../redux/reducer/cart";
import { setCart } from "../../redux/actions/cart";
import Modal from "../Modal/Modal";

const Detail = () => {
  const product = useSelector((state) => state.productReducer.product);
  let { productId } = useParams();
  const [isModal, setIsModal] = useState(false);
  const [isMessage, setIsMessage] = useState();
  const [size, setSize] = useState();
  const dispatch = useDispatch();
  const apiProduct = `http://localhost:8080/v1/product/${productId}`;
  const handleOption = (e) => {
    const value = e.target.getAttribute("value");
    setSize(value);
  };
  const getProduct = async (url) => {
    try {
      const res = await axios.get(url);
      const product = res.data[0];
      dispatch(setProduct(product));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct(apiProduct);
  }, []);
  const handleAdd = () => {
    const addCart = {
      _id: product?._id,
      name: product?.name,
      price: product?.price,
      description: product?.description,
      image: product?.image,
      category: product?.category,
      size: size,
    };
    console.log(addCart);
    if (addCart.size !== undefined) {
      dispatch(setCart(addCart));
      setSize(undefined);
      setIsModal(true);
    } else {
      setIsModal(false);
      setIsMessage("is Size");
    }
  };
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.template}>
          <div className={styles.slider}>
            <SwiperCustom>
              {product?.image?.map((x, i) => {
                return (
                  <SwiperSlide className={styles.mySwiperSlide}>
                    <img
                      className={styles.img}
                      key={i}
                      src={`http://localhost:8080/products/${x}`}
                    />
                  </SwiperSlide>
                );
              })}
            </SwiperCustom>
            <div className={styles.info}>
              <h1>{product?.name}</h1>
              <h2>PRICE:{product?.price}</h2>
              <p>{product?.description}</p>
              <div className={styles.option}>
                <h1>SIZE:</h1>
                {product?.size?.map((item, i) => {
                  return (
                    <span value={item} onClick={(e) => handleOption(e)}>
                      {item}
                    </span>
                  );
                })}
                {!size && <p>{isMessage}</p>}
              </div>
              <button className={styles.btn} onClick={() => handleAdd()}>
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
      {isModal && <Modal setIsModal={setIsModal} />}
    </Layout>
  );
};

export default Detail;
