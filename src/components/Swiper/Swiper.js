import React from "react";
import { Swiper } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";
import styles from "./Swiper.module.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const SwiperCustom = ({ children }) => {
  return (
    <Swiper
      modules={[Navigation, EffectFade]}
      spaceBetween={500}
      slidesPerView={2}
      loop
      navigation
      speed={800}
      className={styles.mySwipper}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        1203: {
          slidesPerView: 2,
          spaceBetween: 500,
        },
      }}
    >
      {children}
    </Swiper>
  );
};

export default SwiperCustom;
