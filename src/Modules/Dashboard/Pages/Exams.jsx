import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx"; // استيراد مكتبة إنشاء Excel
import {useData} from '../DataContext/DataContext '
import { FaEdit, FaTrash, FaSearch, FaFileExcel } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";

export default function Exams() {
    const { exams, loading, error, handleDeleteExam } = useData();
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredExams, setFilteredExams] = useState(exams);
    const [isExpanded, setIsExpanded] = useState(false);
    const [sortOrder, setSortOrder] = useState("asc"); // حالة الفرز
    const [showStudentsModal, setShowStudentsModal] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 10; // عدد الطلاب في كل صفحة
    useEffect(() => {
        if (Array.isArray(exams) && exams.length > 0) {
            const sortedExams = [...exams].sort((a, b) => a.id - b.id);
            setFilteredExams(sortedExams);
            setSortOrder("asc"); // إعادة ضبط حالة الفرز إلى تصاعدي
        } else {
            setFilteredExams([]); // تعيين قائمة فارغة إذا لم تكن هناك بيانات
        }
    }, [exams]);
    
    const handleSearch = () => {
        if (searchQuery.trim() === "") {
            setFilteredExams(exams);
        } else {
            const filtered = exams.filter((exam) =>
                exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                exam.id.toString().includes(searchQuery)
            );
            setFilteredExams(filtered);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
            setIsExpanded(false);
        }
    };

    const handleSortById = () => {
        const sortedExams = [...filteredExams].sort((a, b) => {
            return sortOrder === "desc" ? a.id - b.id : b.id - a.id;
        });
        setFilteredExams(sortedExams);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // تبديل الاتجاه
    };

    // دالة تصدير البيانات إلى Excel
    const exportToExcel = () => {
        const summarySheet = XLSX.utils.json_to_sheet(
            filteredExams.map((exam) => ({
                "معرف الامتحان": exam.id,
                "اسم الامتحان": exam.name,
                "عدد الطلاب": new Set(exam.student_exams.map((s) => s.id)).size, // عدد الطلاب بدون تكرار
            }))
        );

        const detailsSheet = XLSX.utils.json_to_sheet(
            filteredExams.flatMap((exam) =>
                exam.student_exams.map((student) => ({
                    "معرف الامتحان": exam.id,
                    "اسم الامتحان": exam.name,
                    "اسم المادة": exam.course.name,
                    "السنة الدراسية": exam.course.year_study,
                    "معرف الطالب": student.id,
                    "اسم الطالب": student.name,
                }))
            )
        );

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, summarySheet, "ملخص الامتحانات");
        XLSX.utils.book_append_sheet(workbook, detailsSheet, "تفاصيل الطلاب");
        XLSX.writeFile(workbook, "exams_list.xlsx");
    };

    const openStudentsModal = (students) => {
        setSelectedStudents(students);
        setShowStudentsModal(true);
    };

    const closeStudentsModal = () => {
        setShowStudentsModal(false);
        setSelectedStudents([]);
    };


    const totalPages = Math.ceil(selectedStudents.length / studentsPerPage);
const displayedStudents = selectedStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
);

const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
};

const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
};





    if (loading) return <p className="text-center text-gray-500">جارٍ تحميل البيانات...</p>;
    if (error) return <p className="text-center text-red-500">حدث خطأ: {error}</p>;
        return(
            <> 
        <div className='w-full p-6 rounded-lg space-y-6'>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">الامتحانات</h2>
                <div className="relative flex justify-center">
                    <div className={`flex items-center border border-gray-300 rounded-full transition-all duration-300 ${isExpanded ? "w-72 pl-4 pr-2" : "w-16 h-10 justify-center"} overflow-hidden`} onClick={() => setIsExpanded(true)}>
                        <FaSearch className="text-gray-500 cursor-pointer" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="ابحث عن امتحان..."
                            className={`transition-all duration-300 outline-none px-3 py-2 bg-transparent text-lg ${isExpanded ? "w-full" : "w-0"}`}
                        />
                    </div>
                </div>
                <div className="flex gap-3">
                    <Link to={'/dashboard/Exams/AddExams'}>
                        <button className='bg-orange-500 py-3 px-5 text-white rounded-xl'>إضافة امتحان</button>
                    </Link>
                    {/* زر تصدير إلى Excel */}
                    <button onClick={exportToExcel} className="bg-green-500 flex items-center py-3 px-5 text-white rounded-xl">
                        <FaFileExcel className="ml-2" /> تصدير إلى Excel
                    </button>
                </div>
            </div>
            <div className="overflow-auto max-h-[760px] border rounded-lg" style={{ direction: 'ltr' }}>
                <table className='w-full border-collapse rounded-lg' style={{ direction: 'rtl' }}>
                    <thead>
                        <tr className='bg-orange-500 text-white'>
                            <th className="p-3 text-center cursor-pointer flex items-center justify-center gap-2" onClick={handleSortById}>
                                {sortOrder === "asc" ? <FaArrowDownLong /> : <FaArrowUpLong />}
                                معرف
                            </th>
                            <th className='p-3'>اسم الامتحان</th>
                            <th className='p-3'>اسم المادة</th>
                            <th className='p-3'>السنة الدراسية</th>
                            <th className='p-3'> الطلاب</th>
                            <th className='p-3'>عدد الطلاب</th>
                            <th className='p-3'>الإجراء</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredExams.map((exam, index) => (
                            <tr key={index} className='border-b border-gray-300 hover:bg-gray-100 transition'>
                                <td className='p-3 text-center'>{exam.id}</td>
                                <td className='p-3 text-center'>{exam.name}</td>
                                <td className='p-3 text-center'>{exam.course.name}</td>
                                <td className='p-3 text-center'>{exam.course.year_study}</td>
                                <td className="p-3" style={{ textAlign: "center" }}>
                                {exam.student_exams.length > 0 ? (
                                    <>
                                        {exam.student_exams.slice(0, 1).map((student, index) => (
                                            <div key={index} className="text-sm text-gray-700">
                                                {student.name} ({student.id})
                                            </div>
                                        ))}

                                        {exam.student_exams.length > 1 && (
                                            <button
                                                className="text-blue-500 text-xs mt-1 underline"
                                                style={{background:"none",color:"orange",textDecoration:"none"}}
                                                onClick={() =>  openStudentsModal(exam.student_exams)} // هنا ضع المنطق المناسب لعرض المزيد
                                            >
                                                إظهار المزيد
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    <span className="text-gray-500">لا يوجد طلاب</span>
                                )}
                            </td>
                                <td className='p-3 text-center'>{exam.student_exams.length}</td>
                                <td className='p-3 flex gap-x-4 justify-center' style={{ alignItems: "baseline" }}>
                                    <Link to={'/dashboard/Exams/AddExams'} state={{ exam }}>
                                        <button className='text-blue-500 hover:text-blue-700 transition'>
                                            <FaEdit className='text-lg' />
                                        </button>
                                    </Link>
                                    <button className='text-red-500 hover:text-red-700 transition' onClick={() => handleDeleteExam(exam.id)}>
                                        <FaTrash className='text-lg' />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    {showStudentsModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" style={{position:"absolute"}}>
        <div className="bg-white p-6 rounded-lg w-[600px] h-[600px] overflow-auto">
            <h3 className="text-xl font-semibold mb-4">قائمة الطلاب</h3>
            <ul>
                {displayedStudents.map((student, index) => (
                    <li key={index} className="border-b py-2">
                        {student.name} ({student.id})
                    </li>
                    
                ))}

            </ul>
    
            {/* أزرار التنقل بين الصفحات */}
            <div className="flex justify-between mt-4">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg disabled:opacity-50"
                >
                    السابق
                </button>
                <span>صفحة {currentPage} من {totalPages}</span>
                <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg disabled:opacity-50"
                >
                    التالي
                </button>
            </div>
    
            <button onClick={closeStudentsModal} className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg">
                إغلاق
            </button>
        </div>
    </div>
    )}
</>
);
}