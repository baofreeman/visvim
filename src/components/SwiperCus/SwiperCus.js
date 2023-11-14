import React from "react";
import { Swiper } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import styles from "./SwiperCus.module.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const SwiperCus = ({ children }) => {
  const swiper = new Swiper(".swiper", {
    direction: "vertical",
    loop: true,
  });
  return <div className={styles.swiper}></div>;
};

export default SwiperCus;
