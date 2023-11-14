import React, { useRef } from "react";
import { useMatch, useResolvedPath } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./CustomNavLink.module.scss";

const CustomNavLink = ({ children, to, ...props }) => {
  const refLink = useRef();

  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  const linkClassNames = match ? `${styles.isActive}` : "";
  const linkLine = match ? `${styles.line}` : "";
  return (
    <div className={`${styles.nav_link} ${linkClassNames}`}>
      <Link ref={refLink} to={to} {...props} className={linkLine}>
        {children}
      </Link>
    </div>
  );
};

export default CustomNavLink;
