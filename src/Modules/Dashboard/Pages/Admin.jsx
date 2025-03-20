import React, { useEffect } from 'react';
import {useData} from'../DataContext/DataContext '
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Admin() {
    const { admins, loading, error ,getAdmins} = useData(); // ✅ جلب المشرفين من DataContext

    if (loading) return <p className="text-center text-gray-500">جارٍ تحميل البيانات...</p>;
    if (error) return <p className="text-center text-red-500">حدث خطأ: {error}</p>;

    return (
        <div className="w-full p-6 rounded-lg space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">المشرفين</h2>
                <Link to={'/dashboard/Admin/AddAdmin'}>
                    <button className="bg-orange-500 py-3 px-5 text-white rounded-xl">إضافة مشرف</button>
                </Link>
            </div>
            <div className="overflow-auto max-h-[800px] border rounded-lg" style={{ direction: 'ltr' }}>
            <table className="w-full border-collapse rounded-lg" style={{ direction: 'rtl' }}>
                <thead>
                    <tr className="bg-orange-500 text-white">
                        <th className="p-3">اسم المشرف</th>
                        <th className="p-3">الإيميل</th>
                        <th className="p-3">الدور</th>
                        <th className="p-3">الإجراء</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.length > 0 ? (
                        admins.map((admin, index) => (
                            <tr key={index} className="border-b border-gray-300 hover:bg-gray-100 transition">
                                <td className="p-3 text-center">{admin.name}</td>
                                <td className="p-3 text-center">{admin.email}</td>
                                <td className="p-3 text-center">{admin.role || "غير محدد"}</td>
                                <td className="p-3 flex gap-x-4 justify-center">
                                    <button className="text-blue-500 hover:text-blue-700 transition">
                                        <FaEdit className="text-lg" />
                                    </button>
                                    <button className="text-red-500 hover:text-red-700 transition">
                                        <FaTrash className="text-lg" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center p-4 text-gray-500">
                                لا يوجد مشرفون متاحون.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        </div>
    );
}
