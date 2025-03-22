import React, { useState, useEffect } from 'react';
import {useData} from'../DataContext/DataContext '
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddExams() {
    const location = useLocation();
    const examToEdit = location.state?.exam || null;
    const { createExams, updateExam } = useData(); // يجب إضافة updateExam في DataContext

    const [examName, setExamName] = useState(examToEdit?.name || '');
    const [courseId, setCourseId] = useState(examToEdit?.course?.id || '');
    const [year, setYear] = useState(examToEdit?.course?.year_study || '');
    const [students, setStudents] = useState(
        examToEdit?.student_exams?.map(s => s.id).join(', ') || ''
    );

    useEffect(() => {
        console.log("✏️ بيانات الامتحان:", examToEdit);
    }, [examToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const examsData = {
            exam_name: examName, 
            course_id: Number(courseId), 
            year: year.trim() ? year : "",
            students: students ? students.split(',').map(s => s.trim()) : []
        };
    
        try {
            if (examToEdit) {
                await updateExam(examToEdit.id, examsData);
                toast.success("✅ تم تحديث الامتحان بنجاح");
            } else {
                await createExams(examsData);
                toast.success("✅ تمت إضافة الامتحان بنجاح");
            }
        } catch (error) {
            console.error("❌ خطأ:", error.response?.data || error);
            toast.error("⚠️ حدث خطأ أثناء الحفظ، تأكد من صحة البيانات!");
        }
    };

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <ToastContainer icon={false} />
            <h3 className="text-lg font-semibold mb-4 text-right">
                {examToEdit ? "تعديل الامتحان" : "إضافة امتحان"}
            </h3>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={examName}
                    onChange={(e) => setExamName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-right"
                    placeholder="اسم الامتحان"
                    required
                />
                <input
                    type="number"
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-right"
                    placeholder="معرف المادة (Course ID)"
                    required
                />
                <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-right"
                    placeholder="السنة الدراسية"
                />
                <input
                    type="text"
                    value={students}
                    onChange={(e) => setStudents(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-right"
                    placeholder="معرفات الطلاب (مثال: 1, 2, 3)"
                />
                <button type="submit" className="bg-green-500 text-white p-2 rounded-lg w-full">
                    {examToEdit ? "تحديث" : "إضافة"}
                </button>
            </form>
        </div>
    );
}
