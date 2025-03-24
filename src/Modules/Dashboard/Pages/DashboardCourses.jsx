import React, { useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import {useData} from '../DataContext/DataContext '
import { ToastContainer } from "react-toastify";

export default function DashboardCourses() {
  const { courses, error, handleDeleteCouress } = useData(); // جلب البيانات من الـ context

  useEffect(() => {
    console.log("📢 بيانات الدورات:", courses);
  }, [courses]);

  if (error) return <p className="text-center text-red-500">حدث خطأ: {error}</p>;
  if (!Array.isArray(courses)) return <p className="text-center text-red-500">البيانات غير صحيحة</p>;

  return (
    <div className="w-full p-6 rounded-lg space-y-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* العنوان + زر الإضافة */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">الدورات</h2>
        <Link to="/dashboard/courses/AddCourses">
          <button className="bg-orange-500 py-3 px-5 text-white rounded-xl hover:bg-orange-600 transition">
            إضافة دورة
          </button>
        </Link>
      </div>

      {/* الجدول مع التمرير */}
      <div className="overflow-auto max-h-[800px] border rounded-lg" style={{ direction: "ltr" }}>
        <table className="w-full border-collapse rounded-lg" style={{ direction: "rtl" }}>
          <thead>
            <tr className="bg-orange-500 text-white">
              <th className="p-3 text-center">اسم الدورة</th>
              <th className="p-3 text-center">الدكتور</th>
              <th className="p-3 text-center">المعيد</th>
              <th className="p-3 text-center">السنة الدراسية</th>
              <th className="p-3 text-center">الإجراء</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <tr key={index} className="border-b border-gray-300 hover:bg-gray-100 transition">
                  <td className="p-3 text-center">{course.name || "غير متوفر"}</td>
                  <td className="p-3 text-center">
                    {course.doctor ? `${course.doctor.name}` : "غير متوفر"}
                  </td>
                  <td className="p-3 text-center">
                    {course.assistants && course.assistants.length > 0
                      ? course.assistants.map((assistant) => assistant.name).join(" , ")
                      : "غير متوفر"}
                  </td>
                  <td className="p-3 text-center">{course.year_study || "غير متوفر"}</td>
                  <td className="p-3 flex gap-x-3 justify-center text-center" style={{ alignItems: "baseline" }}>
                    <Link to={"/dashboard/courses/AddCourses"} state={{ course }}>
                      <button className="text-blue-500 hover:text-blue-700 transition">
                        <FaEdit className="text-lg" />
                      </button>
                    </Link>
                    <button
                      className="text-red-500 hover:text-red-700 transition"
                      onClick={() => handleDeleteCouress(course.id)}
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">لا توجد دورات متاحة</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
