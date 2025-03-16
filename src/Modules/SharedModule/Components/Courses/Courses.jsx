import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./Courses.css"; // تأكد من إنشاء ملف CSS مناسب للتنسيق

export default function Courses({ courses, title }) {
    return (
        <section className="Courses" id="Courses">
            {/* العنوان الرئيسي للقسم */}
            <div className="text_center">
                <h5 className="text_center-1">المواد الدراسية</h5>
                <h1 className="text_center-2">{title}</h1>
            </div>
            {/* عرض الكورسات بطريقة مرنة */}
            <div className="Courses-content" style={{margin:"auto",width:"80%"}}>
                {courses.map((course) => (
                    <div className="col" key={course.id}>
                        <div className="cat-item">
                            <img className="img-fluid" src={course.image} alt={course.name} />
                            <Link className="cat-overlay text-white text-decoration-none" to={course.link}>
                                <div className="overlay">
                                    <h4 className="text-white">{course.name}</h4>
                                    <span>{course.count} دورة</span>
                                    <FaArrowRight />
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
