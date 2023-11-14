import React from "react";
import styles from "./Navbar.module.scss";
import Topbar from "./Top/Topbar";
import Mid from "./Mid/Mid";
import Bot from "./Bot/Bot";
const Navbar = () => {
  return (
    <div className={styles.container}>
      <Topbar />
      <Mid />
      <Bot />
    </div>
  );
};
export default Navbar;
