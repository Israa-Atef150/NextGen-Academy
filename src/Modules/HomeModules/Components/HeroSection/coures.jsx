import React from 'react'
import './coures.css'
export default function coures() {
    const coursesData = [
        { id: 1, name: "تصميم المواقع", image: "src/assets/imgs/course-1.jpg", count: 100, link: "/courses/web-design" },
        { id: 2, name: "تطوير البرمجيات", image: "src/assets/imgs/course-2.jpg", count: 100, link: "/courses/development" },
        { id: 3, name: "تصميم الألعاب", image: "src/assets/imgs/course-3.jpg", count: 100, link: "/courses/game-design" },
        { id: 4, name: "تصميم التطبيقات", image: "src/assets/imgs/course-4.jpg", count: 100, link: "/courses/apps-design" },
        { id: 5, name: "التسويق الرقمي", image: "src/assets/imgs/course-5.jpg", count: 100, link: "/courses/marketing" },
        { id: 6, name: "البحث العلمي", image: "src/assets/imgs/course-6 (1).jpg", count: 100, link: "/courses/research" },
        { id: 7, name: "كتابة المحتوى", image: "src/assets/imgs/course-6.jpg", count: 100, link: "/courses/content-writing" },
        { id: 8, name: "تحسين محركات البحث (SEO)", image: "src/assets/imgs/course-4.jpg", count: 100, link: "/courses/seo" },
    ];
    return (
        <section className='CouresHolder'>
            <div className="CouresHolderContent">
                <span className='space'> </span>
                <div className="CouresHolderInfo">
                    <h5>الدورات الدراسيه</h5>
                    <div className="content">
                        <div className="card">
                            <img src="src/assets/imgs/course-6.jpg" alt="" />
                            <h6>فرقه رابعه</h6>
                            <h6>دراسات جدوي إقتصادية</h6>
                            <button>شاهد الان</button>
                        </div>
                        <div className="card">
                            <img src="src/assets/imgs/course-6.jpg" alt="" />
                            <h6>فرقه رابعه</h6>
                            <h6>دراسات جدوي إقتصادية</h6>
                            <button>شاهد الان</button>
                        </div>
                        <div className="card">
                            <img src="src/assets/imgs/course-6.jpg" alt="" />
                            <h6>فرقه رابعه</h6>
                            <h6>دراسات جدوي إقتصادية</h6>
                            <button>شاهد الان</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
