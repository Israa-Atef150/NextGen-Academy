import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function DashboardCourses() {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        console.error("No token found!");
        return;
      }
      
      try {
        const res = await axios.get("https://ishraaq.up.railway.app/api/courses", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        setCourses(res.data); // تحديث الحالة بالبيانات القادمة من API
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]); // يضمن إعادة الجلب عند تغير التوكن
  console.log(courses);
  return (
    <div className='w-full p-6 bg-white shadow-md rounded-lg space-y-6'>
      <div className='flex justify-between items-center border-b pb-4'>
        <h2 className='text-2xl font-semibold text-gray-800'>الدورات</h2>
        <Link to='/dashboard/courses/AddCourses'>
          <button className='bg-orange-500 hover:bg-orange-600 transition py-2 px-6 text-white font-medium rounded-lg shadow'>
            + إضافة دورة
          </button>
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className='w-full border-collapse rounded-lg overflow-hidden shadow-md'>
          <thead>
            <tr className='bg-orange-500 text-white text-lg'>
              <th className='p-3 '>اسم الدورة</th>
              <th className='p-3 '> الدكتور</th>
              <th className='p-3 '> المعيد</th>
              <th className='p-3 '>السنة الدراسية</th>
              <th className='p-3 '>الإجراء</th>
            </tr>
          </thead>
          <tbody>
            {courses.course_count > 0 ? (
              courses.courses.map((item) => (
                <tr key={item.id} className='border-b border-gray-300 hover:bg-gray-100 transition'>
                  <td className='p-3 text-right' style={{ textAlign: "center" }}>{item.name}</td>
                  <td className='p-3 text-right' style={{ textAlign: "center" }}>
                    {item.doctor
                      ? `(${item.doctor.id}) - ${item.doctor.name}`
                      : 'غير متوفر'}
                  </td>
                  <td className='p-3 text-right' style={{ textAlign: "center" }}>
  {Array.isArray(item.assistants) && item.assistants.length > 0
    ? item.assistants.map((assistant) => `(${assistant.id}) - ${assistant.name}`).join(' ')
    : 'غير متوفر'}
</td>



                  <td className='p-3 text-right' style={{ textAlign: "center" }}>{item.year_study}</td>
                  <td className='p-3 flex justify-center items-center gap-4'>
                    <button className='text-blue-600 hover:text-blue-800 transition'>
                      <FaEdit className='text-lg' />
                    </button>
                    <button className='text-red-600 hover:text-red-800 transition'>
                      <FaTrash className='text-lg' />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-600">
                  لا توجد دورات متاحة حاليًا.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}