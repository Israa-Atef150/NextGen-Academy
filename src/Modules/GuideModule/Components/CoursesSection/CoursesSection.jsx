import React from 'react';
import image from '../../../../assets/imgs/slide2.jpg';
import Courses from '../../../SharedModule/Components/Courses/Courses';


export default function CoursesSection() {
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
        <section className='courses-section' style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* كورسات الأعلى تصنيفًا */}
            <Courses title="أعلى كورسات تصنيف" courses={trendingCourses} />

            {/* الكورسات الأكثر إعجابًا */}
            <Courses title="الأكثر كورسات إعجابًا" courses={bestSellingCourses} />
        </section>
    );
}
