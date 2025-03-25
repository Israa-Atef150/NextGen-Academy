import React, { useState, useEffect } from "react";
import { useData } from '../DataContext/DataContext '
import { FaEdit, FaTrash, FaSearch,FaFileExcel } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import * as XLSX from "xlsx"; // 📂 استيراد مكتبة Excel
export default function Questions() {
const { questions, error, handleDeletegetQuestions } = useData();
const [searchQuery, setSearchQuery] = useState("");
const [filteredQuestions, setFilteredQuestions] = useState(questions);
const [isExpanded, setIsExpanded] = useState(false);

useEffect(() => {
    setFilteredQuestions(questions);
    }, [questions]);

    const handleSearch = () => {
        if (searchQuery.trim() === "") {
            setFilteredQuestions(questions);
        } else {
            const filtered = questions.filter((question) =>
                question.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                question.id.toString().includes(searchQuery) // البحث في المعرف أيضاً
            );
            setFilteredQuestions(filtered);
        }
    };
    

    const handleKeyDown = (e) => {
    if (e.key === "Enter") {
        handleSearch(); // تنفيذ البحث عند الضغط على Enter
        setIsExpanded(false); // إغلاق مربع البحث بعد البحث
    }
    };
if (error) return <p className="text-center text-red-500">حدث خطأ: {error}</p>;

const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
        filteredQuestions.map((question) => ({
        "معرف السؤال": question.id,
        "محتوى السؤال": question.content || "غير متوفر",
        "الإجابة الصحيحة": question.correct_answer?.content || "غير متوفر",
        "الإجابات": question.answers?.map((answer) => answer.content).join(" , ") || "غير متوفر",
        }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Questions");
    XLSX.writeFile(workbook, "questions_list.xlsx");
    };

return (
<div className='w-full p-6 rounded-lg space-y-6'>
    <ToastContainer position="top-right" autoClose={3000} />
    {/* العنوان + زر الإضافة */}
    <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">الاسئله</h2>
    
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
                    placeholder="ابحث عن سؤال..."
                    className={`transition-all duration-300 outline-none px-3 py-2 bg-transparent text-lg ${
                    isExpanded ? "w-full" : "w-0"
                    }`}
                />
                </div>
            </div>
            <div className="flex gap-4">
        <Link to={'/dashboard/Questions/AddQuestions'}>
            <button className='bg-orange-500 py-3 px-5 text-white rounded-xl'>
                اضافة الاسئله
            </button>
        </Link>
        <button onClick={exportToExcel} className="bg-green-500 flex items-center py-3 px-5 text-white rounded-xl">
        <FaFileExcel className="ml-2" /> تصدير إلى Excel
        </button>
    </div>
    </div>
    <div className="overflow-auto max-h-[760px] border rounded-lg" style={{ direction: 'ltr' }}>
        <table className='w-full border-collapse rounded-lg' style={{ direction: 'rtl' }}>
            <thead>
                <tr className='bg-orange-500 text-white'>
                    <th className='p-3'>معرف السؤال</th>
                    <th className='p-3'>محتوي سؤال</th>
                    <th className='p-3'>الاجابه الصحيحه</th>
                    <th className='p-3'>الاجابات</th>
                    <th className='p-3'>الإجراء</th>
                </tr>
            </thead>
            <tbody>
                {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((question, index) => (
                        <tr key={index} className='border-b border-gray-300 hover:bg-gray-100 transition'>
                            <td className='p-3' style={{ textAlign: "center" }}>{question.id}</td>
                            <td className='p-3' style={{ textAlign: "center" }}>{question.content || 'غير متوفر'}</td>
                            <td className='p-3' style={{ textAlign: "center" }}>{question.correct_answer.content || 'غير متوفر'}</td>
                            <td className='p-3' style={{ textAlign: "center" }}>
                                {question.answers?.length > 0 ? (
                                    <ul className="list-disc list-inside">
                                        {question.answers.map((answer) => (
                                            <li key={answer.id} className="text-gray-700">
                                                {answer.content}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span className="text-gray-500">لا توجد إجابات</span>
                                )}
                            </td>
                            <td className='p-3 flex gap-x-4 justify-center' style={{ alignItems: "baseline" }}>
                                <Link to={'/dashboard/Questions/AddQuestions'} state={question}>
                                    <button className='text-blue-500 hover:text-blue-700 transition'>
                                        <FaEdit className='text-lg' />
                                    </button>
                                </Link>
                                <button
                                    className='text-red-500 hover:text-red-700 transition'
                                    onClick={() => question.id && handleDeletegetQuestions(question.id)}
                                >
                                    <FaTrash className='text-lg' />
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="text-center p-4 text-gray-500">
                            لا توجد امتحانات حالياً.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
</div>
);
}
