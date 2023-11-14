import React from "react";
import styles from "./Modal.module.scss";
import { useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ setIsModal }) => {
  const Carts = useSelector((state) => state.cartReducer.cart);
  console.log(Carts);
  return (
    <div className={styles.container}>
      <h1>ORDER SUCCESS</h1>
      {Carts &&
        Carts?.map((item, i) => {
          return (
            <div className={styles.items} key={i}>
              <div className={styles.item}>
                <div className={styles.image}>
                  <img
                    src={`http://localhost:8080/products/${item?.image[0]}`}
                  />
                </div>
                <div className={styles.info}>
                  <h2>{item?.name}</h2>
                  <h2>{item?.price}</h2>
                  <h2>{item?.size}</h2>
                </div>
              </div>
            </div>
          );
        })}
      <div className={styles.more}>
        <button className={styles.btn}>View Checkout</button>
        <button className={styles.btn}>Continue Shopping</button>
      </div>
      <div className={styles.close} onClick={() => setIsModal(false)}>
        <AiOutlineClose />
      </div>
    </div>
  );
};

export default Modal;
