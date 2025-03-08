import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import './Courses.css';

export default function Courses({ courses, title }) {
    return (
        <div className='Courses'>
            <h4 className='Courses-title'>{title}</h4>
            <div className="Courses-content">
                {courses.map((course) => (
                    <div className="card" key={course.id}>
                        <img src={course.image} alt={course.name} />
                        <h3 className='name'>{course.name}</h3>
                        <Link to="" className='link'>
                            <FaArrowRight /> <span className='text'>ابدأ الآن</span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
