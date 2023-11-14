import React from "react";
import styles from "./Button.module.scss";

const Button = ({ children, primary, basic, ...props }) => {
  const btnStyles = { "btn-primary": primary, "btn-basic": basic };
  console.log(btnStyles);
  return (
    <button className={styles.btnStyles} {...props}>
      {children}
    </button>
  );
};

export default Button;
