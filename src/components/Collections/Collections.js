import React from "react";
import styles from "./Collections.module.scss";
import { NavLink } from "react-router-dom";
import { setCart } from "../../redux/actions/cart";
import { useDispatch, useSelector } from "react-redux";

const Collections = ({ data }) => {
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        {data &&
          data.map((item, i) => {
            return (
              <>
                <NavLink
                  className={styles.item}
                  to={`/shop/${item?._id}`}
                  key={item?._id}
                >
                  <div className={styles.slide}>
                    {item?.image.map((x, j) => {
                      if (j < 2) {
                        return;
                      }
                      return (
                        <img
                          key={j}
                          src={`http://localhost:8080/products/${x}`}
                        />
                      );
                    })}
                  </div>
                  <div className={styles.info}>
                    <h1>{item.name}</h1>
                    <span>{item.price}</span>
                  </div>
                </NavLink>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default Collections;
