import React from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.container}>
      <Navbar />
    </header>
  );
};

export default Header;
