import React from "react";
import "./HeroSection.css"; // استيراد ملف CSS
export default function HeroSection() {
  return (
    <>
    <div className="hero-container">
  
      <img 
        src="./src/assets/imgs/slide1.jpg" 
        alt="hero section" 
        className="hero-image"
      />

      {/* النص فوق الصورة */}
   
      <div className="hero-content">
        <h1>مرحبًا بك في منصتنا التعليمية</h1>
        <p>نحن نوفر لك أفضل الدورات التعليمية لتطوير مهاراتك وتحقيق أهدافك!</p>
        <button className="hero-button">ابدأ الآن</button>
      </div>
    </div>
    </>
  );
}
