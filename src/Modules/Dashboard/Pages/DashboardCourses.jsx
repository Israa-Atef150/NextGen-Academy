import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch,FaFileExcel } from "react-icons/fa";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {useData} from '../DataContext/DataContext '
import { ToastContainer } from "react-toastify";
import * as XLSX from "xlsx"; // 📂 استيراد مكتبة Excel
export default function DashboardCourses() {
  const { courses, error, handleDeleteCouress } = useData(); // جلب البيانات من الـ context
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc"); // حالة الفرز

  useEffect(() => {
    if (Array.isArray(courses) && courses.length > 0) {
      const sortedCourses = [...courses].sort((a, b) => a.id - b.id);
      setFilteredCourses(sortedCourses);
      setSortOrder("asc"); // ضبط حالة الفرز على تصاعدي
    }
  }, [courses]);

  
      const handleSearch = () => {
        if (searchQuery.trim() === "") {
          setFilteredCourses(courses);
        } else {
            const filtered = courses.filter((course) =>
              course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.id.toString().includes(searchQuery) // البحث في المعرف أيضاً
            );
            setFilteredCourses(filtered);
        }
    };

  
      const handleKeyDown = (e) => {
      if (e.key === "Enter") {
          handleSearch(); // تنفيذ البحث عند الضغط على Enter
          setIsExpanded(false); // إغلاق مربع البحث بعد البحث
      }
      };

      const handleSortById = () => {
        const sortedCourses = [...filteredCourses].sort((a, b) => {
            return sortOrder === "desc" ? a.id - b.id : b.id - a.id;
        });
    
        setFilteredCourses(sortedCourses);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // تبديل الاتجاه
        };
        
      const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
          filteredCourses.map((course) => ({
            "معرف": course.id,
            "اسم الدورة": course.name,
            "الدكتور": course.doctor?.name || "غير متوفر",
            "المعيد": course.assistants?.map((assistant) => assistant.name).join(" , ") || "غير متوفر",
            "السنة الدراسية": course.year_study || "غير متوفر",
          }))
        );
      
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Courses");
        XLSX.writeFile(workbook, "courses_list.xlsx"); // ✅ تغيير اسم الملف
      };
      



      
  if (error) return <p className="text-center text-red-500">حدث خطأ: {error}</p>;
  if (!Array.isArray(courses)) return <p className="text-center text-red-500">البيانات غير صحيحة</p>;

  return (
    <div className="w-full p-6 rounded-lg space-y-6">
      <ToastContainer position="top-right" autoClose={3000} />

  {/* العنوان + زر الإضافة */}
        <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">الدورات</h2>

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
                placeholder="ابحث عن دوره..."
                className={`transition-all duration-300 outline-none px-3 py-2 bg-transparent text-lg ${
                isExpanded ? "w-full" : "w-0"
                }`}
            />
            </div>
        </div>
        <div className="flex gap-3">
        <Link to="/dashboard/courses/AddCourses">
          <button className="bg-orange-500 py-3 px-5 text-white rounded-xl hover:bg-orange-600 transition">
            إضافة الدورات
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
              <th className="p-3 text-center cursor-pointer flex items-center justify-center gap-2" onClick={handleSortById}>
                  {sortOrder === "asc" ? <FaArrowDownLong /> : <FaArrowUpLong />}
                  معرف
              </th>
              <th className="p-3 text-center">اسم الدورة</th>
              <th className="p-3 text-center">الدكتور</th>
              <th className="p-3 text-center">المعيد</th>
              <th className="p-3 text-center">السنة الدراسية</th>
              <th className="p-3 text-center">الإجراء</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
                <tr key={index} className="border-b border-gray-300 hover:bg-gray-100 transition">
                  <td className="p-3 text-center">{course.id || "غير متوفر"}</td>
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
