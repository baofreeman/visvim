import React from "react";
import styles from "./Sidebar.module.scss";
import { NavLink } from "react-router-dom";

const Sidebar = ({ data }) => {
  const sidebarList = ["all", "t-shirt", "shirt", "pants"];
  return (
    <div className={styles.container}>
      <ul>
        {data.map((item, i) => {
          return (
            <NavLink key={item?._id} to={`/shop/categogy/${sidebarList[i]}`}>
              <span>{sidebarList[i]}</span>
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
