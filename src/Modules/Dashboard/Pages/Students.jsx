import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch,FaFileExcel } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {useData} from '../DataContext/DataContext '
import * as XLSX from "xlsx"; // 📂 استيراد مكتبة Excel
export default function Students() {
  const { students, error, handleDeleteStudent } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(students);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setFilteredStudents(students);
  }, [students]);

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setFilteredStudents(students);
    } else {
        const filtered = students.filter((student) =>
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.id.toString().includes(searchQuery) // البحث في المعرف أيضاً
        );
        setFilteredStudents(filtered);
    }
};
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // تنفيذ البحث عند الضغط على Enter
      setIsExpanded(false); // إغلاق مربع البحث بعد البحث
    }
  };

  const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(
    filteredStudents.map((student) => ({
      "معرف": student.id,
      "الاسم": student.name,
      "رقم الهاتف": student.phone_number || "غير متوفر",
      "تاريخ الميلاد": student.birth_of_date || "غير متوفر",
      "السنة الدراسية": student.year_study || "غير متوفر",
      "النوع": student.gender || "غير متوفر",
      "العنوان": student.address || "غير متوفر",
      "الإيميل": student.email || "غير متوفر",
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
  XLSX.writeFile(workbook, "students_list.xlsx"); // ✅ تصحيح اسم الملف
    };


  return (
    <div className="w-full p-6 rounded-lg space-y-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* العنوان + زر الإضافة */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">الطلاب</h2>

        <div className="relative flex justify-center">
          <div
            className={`flex items-center border border-gray-300 rounded-full transition-all duration-300 ${
              isExpanded ? "w-72 pl-4 pr-2" : "w-16 h-10 justify-center"
            } overflow-hidden`}
            onClick={() => setIsExpanded(true)}
          >
            <FaSearch className="text-gray-500 cursor-pointer" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="ابحث عن طالب..."
              className={`transition-all duration-300 outline-none px-3 py-2 bg-transparent text-lg ${
                isExpanded ? "w-full" : "w-0"
              }`}
            />
          </div>
        </div>
        <div className="flex gap-4">
        <Link to="/dashboard/students/AddStudents">
          <button className="bg-orange-500 py-3 px-5 text-white rounded-xl">
            إضافة الطلاب
          </button>
        </Link>
            <button onClick={exportToExcel} className="bg-green-500 flex items-center py-3 px-5 text-white rounded-xl">
            <FaFileExcel className="ml-2" /> تصدير إلى Excel
            </button>
      </div>
      </div>
      {/* الجدول مع التمرير */}
      <div className="overflow-auto max-h-[760px] border rounded-lg" style={{ direction: 'ltr' }}>
        <table className="w-full border-collapse rounded-lg" style={{ direction: "rtl" }}>
          <thead>
            <tr className="bg-orange-500 text-white">
              <th className="p-3 text-center">معرف</th>
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
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <tr key={index} className="border-b border-gray-300 hover:bg-gray-100 transition">
                  <td className="p-3 text-center">{student.id || "غير متوفر"}</td>
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
