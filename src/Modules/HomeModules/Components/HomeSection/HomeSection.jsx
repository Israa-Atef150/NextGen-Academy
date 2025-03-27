import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import LearningPath from "../LearningPath";
import Footer from "../../../SharedModule/Components/Footer/Footer";
import EducationSection from "../EducationSection";
import CoreValues from "./../CoreValues";

const slides = [
  {
    image: "/src/assets/imgs/home4.jpg",
    title: "مرحبا بكم في منصة إشراق التعليمية",
    description: "تعلم مهارات جديدة من أفضل الخبراء.",
  },
  {
    image: "/src/assets/imgs/home2.jpg",
    title: "دورات تعليمية متميزة",
    description: "انضم إلى دوراتنا اليوم وطور من مهاراتك.",
  },
  {
    image: "/src/assets/imgs/home1.jpg",
    title: "احصل على شهادة معتمدة",
    description: "نوفر لك شهادات إلكترونية بعد إكمال الدورات.",
  },
];

const HomeSection = () => {
  return (
    <section className="relative w-full h-screen">
      {/* ✅ Navbar ثابت فوق الـ Swiper */}
      <nav className="fixed top-0 left-0 w-full bg-black/50 backdrop-blur-md text-white py-4 px-8 flex justify-between items-center z-50">
        {/* ✅ اللوجو + اسم الموقع */}
        <div className="flex items-center gap-3">
          <img
            src="/src/assets/imgs/logo.jpg"
            alt="Logo"
            className="w-12 h-12 rounded-full"
          />
          <h1 className="text-2xl font-bold">إشراق</h1>
        </div>

        {/* ✅ القائمة */}
        <ul className="flex gap-6 text-lg">
          {["الرئيسية", "الدورات", "الامتحانات", "اتصل بنا"].map(
            (item, index) => (
              <li key={index} className="relative">
                <a href="#" className="hover:text-orange-400 transition duration-300">
                  {item}
                </a>
                <div className="absolute left-0 bottom-0 w-0 h-[3px] bg-orange-400 transition-all duration-300 hover:w-full"></div>
              </li>
            )
          )}
        </ul>
      </nav>

      {/* ✅ Swiper مع الصور كخلفية تغطي الشاشة بالكامل */}
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 4000 }}
        loop
        className="w-full h-screen"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-screen flex items-center justify-center bg-cover bg-center relative"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* ✅ طبقة شفافة فوق الصورة */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* ✅ النصوص في المنتصف */}
              <div className="relative text-center text-white max-w-2xl px-4">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg md:text-xl mb-6">{slide.description}</p>
                <div className="flex justify-center gap-4">
                  <button className="bg-orange-500 hover:bg-orange-700 text-white px-6 py-3 rounded-lg text-lg">
                    ابدأ الآن
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg text-lg">
                    تعرف أكثر
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ باقي الأقسام */}
      <LearningPath />
      <EducationSection />
      <CoreValues />
      <Footer />
    </section>
  );
};

export default HomeSection;
