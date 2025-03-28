    import React, { useContext, useEffect } from 'react';
    import {useData}from'../DataContext/DataContext '
    import { FaEdit, FaTrash } from 'react-icons/fa';
    import { Link } from 'react-router-dom';

    export default function Exams() {
    // الوصول إلى البيانات من DataContext باستخدام useData
    const { exams, loading, error,handleDeleteExam } = useData();

    // عرض حالة التحميل أو الخطأ
    if (loading) return <p className="text-center text-gray-500">جارٍ تحميل البيانات...</p>;
    if (error) return <p className="text-center text-red-500">حدث خطأ: {error}</p>;

    return (
    <div className='w-full p-6 rounded-lg space-y-6'>
        <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-semibold text-gray-800'>الامتحانات</h2>
        <Link to={'/dashboard/Exams/AddExams'}>
            <button className='bg-orange-500 py-3 px-5 text-white rounded-xl'>
            اضافة الامتحانات
            </button>
        </Link>
        </div>
            {/* ✅ إضافة Scroll للجدول */}
        <div className="overflow-auto max-h-[780px] border rounded-lg" style={{ direction: 'ltr' }}>
        <table className='w-full border-collapse rounded-lg'  style={{ direction: 'rtl' }}>
        <thead>
            <tr className='bg-orange-500 text-white'>
            <th className='p-3'>اسم الامتحان</th>
            <th className='p-3'>اسم الماده</th>
            <th className='p-3'>السنه الدراسيه</th>
            <th className='p-3'>طلاب معين </th>
            <th className='p-3'>الإجراء</th>
            </tr>
        </thead>
        <tbody>
            {exams.length > 0 ? (
            exams.map((exam, index) => (
                <tr key={index} className='border-b border-gray-300 hover:bg-gray-100 transition'>
                    <td className='p-3' style={{ textAlign: "center" }}>{exam.name}</td>
                    <td className='p-3' style={{ textAlign: "center" }}>{exam.course.name}</td>
                <td className='p-3' style={{ textAlign: "center" }}>{exam.course.year_study}</td>
        <td className="p-3" style={{ textAlign: "center" }}>
            {exam.student_exams.length > 0 ? (
                <>
                    {exam.student_exams.slice(0, 1).map((student, index) => (
                        <div key={index} className="text-sm text-gray-700">
                            {student.name} ({student.id})
                        </div>
                    ))}

                    {exam.student_exams.length > 2 && (
                        <button
                            className="text-blue-500 text-xs mt-1 underline"
                            style={{background:"none",color:"orange",textDecoration:"none"}}
                            onClick={() => alert("عرض جميع الطلاب")} // هنا ضع المنطق المناسب لعرض المزيد
                        >
                            إظهار المزيد
                        </button>
                    )}
                </>
            ) : (
                <span className="text-gray-500">لا يوجد طلاب</span>
            )}
        </td>
                <td className='p-3 flex gap-x-4 justify-center' style={{alignItems:"baseline"}}>
                <Link to={'/dashboard/Exams/AddExams'} state={{ exam }}>
                <button className='text-blue-500 hover:text-blue-700 transition'>
                    <FaEdit className='text-lg' />
                </button>
                </Link>
                    <button className='text-red-500 hover:text-red-700 transition' onClick={()=>{handleDeleteExam(exam.id)}}>
                    <FaTrash className='text-lg' />
                    </button>
                </td>
                </tr>
            ))
            ) : (
            <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
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
