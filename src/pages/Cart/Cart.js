import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Cart.module.scss";
import Layout from "../../components/Layout/Layout";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { deleteCart, dercCart, setCart } from "../../redux/actions/cart";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Cart = () => {
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState();
  const dispatch = useDispatch();
  const Cart = useSelector((state) => state.cartReducer.cart);
  const User = useSelector((state) => state.userReducer.user);
  const navigate = useNavigate();
  const location = useLocation();
  const total = () => {
    let price = 0;
    Cart.map((item) => {
      price = parseFloat(item.price) * item.quantity + price;
      setPrice(price);
    });
  };
  useEffect(() => {
    localStorage.setItem("total", JSON.stringify(price));
    total();
  }, [total]);

  const handleAdd = (e) => {
    dispatch(setCart(e));
  };
  const handleDecr = (e) => {
    dispatch(dercCart(e));
  };
  const handleDeleteCart = (e, i) => {
    dispatch(deleteCart(e, i));
  };
  const handleCheckout = () => {
    console.log(User);
    if (!User?._id) {
      navigate("/login", { state: location?.pathname });
    } else if (!Cart.length) {
      setMessage("ban chua co san pham");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.items}>
          <div className={styles.tab}>
            <h1 className={styles.product}>PRODUCT</h1>
            <h1 className={styles.quantity}>QUANTITY</h1>
            <h1 className={styles.price}>PRICE</h1>
          </div>
          {Cart.map((item, i) => {
            return (
              <div className={styles.item} key={i}>
                <div className={styles.image}>
                  <img
                    src={`http://localhost:8080/products/${item?.image[0]}`}
                  />
                  <div>
                    <h1>{item?.name}</h1>
                    <h1>{item?.size}</h1>
                  </div>
                </div>
                <div className={styles.wrap}>
                  <div className={styles.info}>
                    <div className={styles.changeQty}>
                      <div
                        className={styles.inre}
                        onClick={() => handleAdd(item)}
                      >
                        <AiOutlinePlus />
                      </div>
                      <h1>{item?.quantity}</h1>
                      <div
                        className={styles.decr}
                        onClick={() => handleDecr(item)}
                      >
                        <AiOutlineMinus />
                      </div>
                    </div>
                  </div>
                  <div className={styles.price}>
                    {item?.price * item?.quantity}
                    <div
                      className={styles.trash}
                      onClick={() => handleDeleteCart(item, i)}
                    >
                      <BsTrash />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <span>{message}</span>
        </div>
        <div className={styles.total}>
          <div className={styles.totalPrice}>
            <h2>TOTAL BILLINGS</h2>
            <h1>{price}</h1>
          </div>
          <div className={styles.button}>
            <button className={styles.btn} onClick={() => handleCheckout()}>
              CHECKOUT
            </button>
            <button className={styles.btn}>CONTINUE SHOPPING</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
