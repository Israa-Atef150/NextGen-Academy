import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./HeroSection.css";

import slide1 from "../../../../assets/imgs/slide1.jpg";
import slide2 from "../../../../assets/imgs/slide2.jpg";
import about1 from "../../../../assets/imgs/about1.jpg";

export default function HeroSection() {
  const slides = [
    { image: slide1, title: "مرحبًا بك في منصتنا التعليمية", text: "نحن نوفر لك أفضل الدورات التعليمية لتطوير مهاراتك!" },
    { image: slide2, title: "تعلم بأسلوب حديث", text: "دورات متقدمة تناسب جميع المستويات!" },
    { image: about1, title: "ابدأ رحلتك التعليمية", text: "انضم إلى آلاف الطلاب حول العالم." },
  ];

  return (
    <div className="hero-container">
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        className="hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slide-content">
              <img src={slide.image} alt={`Slide ${index + 1}`} className="hero-image" />
              <div className={`hero-content slide-${index}`}>
                <h1>{slide.title}</h1>
                <p>{slide.text}</p>
                <button className="hero-button">اكتشف المزيد</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
