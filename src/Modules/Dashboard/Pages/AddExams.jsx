import React, { useState } from 'react';
import {useData} from '../DataContext/DataContext '
export default function AddExams() {
    const { createExams } = useData(); // Access createExams from the context
    const [examName, setExamName] = useState('');
    const [courseId, setCourseId] = useState('');
    const [year, setYear] = useState('');
    const [students, setStudents] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const examsData = {
            exam_name: examName, 
            course_id: courseId, 
            year: year.trim() ? year : "", // ✅ إرسال سلسلة فارغة بدلاً من null
            students: students ? students.split(',').map(s => s.trim()) : []
        };
        
    
        try {
            await createExams(examsData);
        } catch (error) {
            console.error("❌ Error in adding exam:", error.response?.data || error);
        }
    };
    

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-right">إضافة امتحان</h3>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                
                {/* اسم الامتحان */}
                <input
                    type="text"
                    value={examName}
                    onChange={(e) => setExamName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-right"
                    placeholder="اسم الامتحان"
                    required
                />

                {/* معرف المادة (Course ID) */}
                <input
                    type="number"
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-right"
                    placeholder="معرف المادة (Course ID)"
                    required
                />
                
                {/* سنة الطالب */}
                <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-right"
                    placeholder="السنة الدراسية"
                    
                />

                {/* الطلاب (يمكن إدخال معرفات الطلاب كمصفوفة مفصولة بفواصل) */}
                <input
                    type="text"
                    value={students}
                    onChange={(e) => setStudents(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-right"
                    placeholder="معرفات الطلاب (مثال: 1, 2, 3)"
                />

                {/* زر الإضافة */}
                <button type="submit" className="bg-green-500 text-white p-2 rounded-lg w-full">
                    إضافة
                </button>
            </form>
        </div>
    );
}
