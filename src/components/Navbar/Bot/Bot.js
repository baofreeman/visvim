import React, { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Botbar.module.scss";
import CustomNavLink from "../../CustomNavLink/CustomNavLink";

const Bot = () => {
  return (
    <div className={styles.container}>
      <nav>
        <CustomNavLink to="/">Shop</CustomNavLink>
        <CustomNavLink to="/">Collection</CustomNavLink>
        <CustomNavLink to="/">Outlet Sale</CustomNavLink>
      </nav>
    </div>
  );
};

export default Bot;
