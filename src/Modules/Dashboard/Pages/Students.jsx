import React, { useEffect } from "react";
import {useData} from '../DataContext/DataContext '
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function Students() {
  const { students, error, handleDeleteStudent } = useData(); // جلب البيانات من الـ context

  // useEffect(() => {
  //   console.log("📢 بيانات الطلاب:", students);
  // }, [students]);

  if (error) return <p className="text-center text-red-500">حدث خطأ: {error}</p>;
  if (!Array.isArray(students)) return <p className="text-center text-red-500">البيانات غير صحيحة</p>;

  return (
    <div className="w-full p-6 rounded-lg space-y-6">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* العنوان + زر الإضافة */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">الطلاب</h2>
        <Link to="/dashboard/students/AddStudents">
          <button className="bg-orange-500 py-3 px-5 text-white rounded-xl">
            إضافة الطلاب
          </button>
        </Link>
      </div>

      {/* الجدول مع التمرير */}
      <div className="overflow-auto max-h-[800px] border rounded-lg" style={{ direction: "ltr" }}>
        <table className="w-full border-collapse rounded-lg" style={{ direction: "rtl" }}>
          <thead>
            <tr className="bg-orange-500 text-white">
              <th className="p-3 text-center">الاسم</th>
              <th className="p-3 text-center">رقم الهاتف</th>
              <th className="p-3 text-center">تاريخ الميلاد</th>
              <th className="p-3 text-center">السنة الدراسية</th>
              <th className="p-3 text-center">النوع</th>
              <th className="p-3 text-center">العنوان</th>
              <th className="p-3 text-center">الإيميل</th>
              <th className="p-3 text-center">الإجراء</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr key={index} className="border-b border-gray-300 hover:bg-gray-100 transition">
                  <td className="p-3 text-center">{student.name || "غير متوفر"}</td>
                  <td className="p-3 text-center">{student.phone_number || "غير متوفر"}</td>
                  <td className="p-3 text-center">{student.birth_of_date || "غير متوفر"}</td>
                  <td className="p-3 text-center">{student.year_study || "غير متوفر"}</td>
                  <td className="p-3 text-center">{student.gender || "غير متوفر"}</td>
                  <td className="p-3 text-center">{student.address || "غير متوفر"}</td>
                  <td className="p-3 text-center">{student.email || "غير متوفر"}</td>
                  <td className="p-3 flex gap-x-3 justify-center text-center" style={{ alignItems: "baseline" }}>
                    <Link to="/dashboard/students/AddStudents" state={{ student }}>
                      <button className="text-blue-500 hover:text-blue-700 transition">
                        <FaEdit className="text-lg" />
                      </button>
                    </Link>
                    <button
                      className="text-red-500 hover:text-red-700 transition"
                      onClick={() => handleDeleteStudent(student.id)}
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-4">لا يوجد طلاب متاحين</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
