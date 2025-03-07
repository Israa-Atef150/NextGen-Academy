import React from 'react';
import HeroSection from './HeroSection/HeroSection';
import Courses from '../../SharedModule/Components/Courses/Courses';
import image from '../../../assets/imgs/slide2.jpg';

export default function Guide() {
    const coursesList = [
        { id: 1, name: "قسم القانون", image: image, status: "أعلى كورسات تصنيف" },
        { id: 2, name: "قسم الرياضيات", image: image, status: "أعلى كورسات تصنيف" },
        { id: 3, name: "قسم البرمجيات", image: image, status: "أعلى كورسات تصنيف" },
        { id: 4, name: "قسم الذكاء الاصطناعي", image: image, status: "الأكثر كورسات إعجابًا" },
        { id: 5, name: "قسم الشبكات", image: image, status: "الأكثر كورسات إعجابًا" },
        { id: 6, name: "قسم إدارة الأعمال", image: image, status: "الأكثر كورسات إعجابًا" },
    ];

    const trendingCourses = coursesList.filter(course => course.status === "أعلى كورسات تصنيف");
    const bestSellingCourses = coursesList.filter(course => course.status === "الأكثر كورسات إعجابًا");

    return (
        <section className='Guide' style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <section className='HeroSection'>
                <HeroSection />
            </section>
            <Courses title="أعلى كورسات تصنيف" courses={trendingCourses} />
            <Courses title="الأكثر كورسات إعجابًا" courses={bestSellingCourses} />
            <div className="map" style={{width:"80%",margin:"auto",borderRadius:"20px",overflow:"hidden",marginBottom:"50px"}}>
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55251.378079247894!2d31.299577945867338!3d30.05948205503215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2z2KfZhNmC2KfZh9ix2KnYjCDZhdit2KfZgdi42Kkg2KfZhNmC2KfZh9ix2KnigKw!5e0!3m2!1sar!2seg!4v1741380513097!5m2!1sar!2seg"
                    width="100%"
                    height="450"
                    style={{ border: "0"  }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </section>
    );
}
