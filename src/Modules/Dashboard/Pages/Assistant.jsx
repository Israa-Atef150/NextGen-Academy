import React from 'react';
import {useData} from '../DataContext/DataContext '
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Assistant() {
    const { assistants, loading, error,handleDeleteAssistant } = useData();

    if (loading) return <p className="text-center text-gray-500">جاري التحميل...</p>;
    if (error) return <p className="text-center text-red-500">حدث خطأ أثناء جلب البيانات!</p>;

    return (
        <div className="w-full p-6 rounded-lg space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">المعيدين</h2>
                <Link to={'/dashboard/Assistant/AddAssistant'}>
                    <button className="bg-orange-500 py-3 px-5 text-white rounded-xl">
                        إضافة معيد جديد
                    </button>
                </Link>
            </div>
            <table className="w-full border-collapse rounded-lg">
                <thead>
                    <tr className="bg-orange-500 text-white">
                        <th className="p-3">اسم المعيد</th>
                        <th className="p-3">العنوان</th>
                        <th className="p-3">رقم الهاتف</th>
                        <th className="p-3">التخصص</th>
                        <th className="p-3">الدكتور</th>
                        <th className="p-3">الإيميل</th>
                        <th className="p-3">الراتب</th>
                        <th className="p-3">الإجراء</th>
                    </tr>
                </thead>
                <tbody>
                        {assistants.length > 0 ? (
                            assistants.map((assistant, index) => (
                            <tr key={index} className="border-b border-gray-300 hover:bg-gray-100 transition">
                                <td className="p-3 text-center">{assistant.name || 'غير متوفر'}</td>
                                <td className="p-3 text-center">{assistant.address || 'غير متوفر'}</td>
                                <td className="p-3 text-center">{assistant.phone_number || 'غير متوفر'}</td>
                                <td className="p-3 text-center">{assistant.specialist || 'غير متوفر'}</td>
                                <td className="p-3 text-center">
                                {assistant.assistant_doctors?.length > 0
    ? assistant.assistant_doctors.map((doc) => `(${doc.id}) - ${doc.name}`).join(' ')
    : 'غير متوفر'}

                                </td>
                                <td className="p-3 text-center">{assistant.email || 'غير متوفر'}</td>
                                <td className="p-3 text-center">{assistant.salary || 'غير متوفر'}</td>
                                <td className="p-3 flex gap-x-4 justify-center">
                                    <button className="text-blue-500 hover:text-blue-700 transition">
                                        <FaEdit className="text-lg" />
                                    </button>
                                    <button className="text-red-500 hover:text-red-700 transition"onClick={()=>{
                                        handleDeleteAssistant(assistant.id)
                                    }}>
                                        <FaTrash className="text-lg" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center text-gray-500 p-3">
                                لا توجد بيانات متاحة.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}


