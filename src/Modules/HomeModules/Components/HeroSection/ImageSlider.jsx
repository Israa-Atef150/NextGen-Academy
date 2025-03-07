import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import slide1 from "../../../src/assets/imgs/slide3.jpg";
import slide2 from "../../../src/assets/imgs/slide3.jpg";
import slide3 from "../../../src/assets/imgs/slide3.jpg";
// import slide3 from "./assets/slide3.jpg";

const images = [slide1, slide2, slide3];

const ImageSlider = () => {
  return (
    <div >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="rounded-xl overflow-hidden shadow-lg"
      >
        {images.map((src, index) => (
          <SwiperSlide  key={index}>
            <img src={src} alt={`Slide ${index + 1}`} className="hero-image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
