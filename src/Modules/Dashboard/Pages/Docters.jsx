    import React, { useEffect } from "react";
    import {useData} from '../DataContext/DataContext '
    import { FaEdit, FaTrash } from "react-icons/fa";
    import { Link } from "react-router-dom";

    export default function Docters() {
    const { doctors, loading, error } = useData(); // جلب البيانات من الـ context

    useEffect(() => {
    console.log("📢 بيانات الأطباء:", doctors);
    }, [doctors]);


    if (loading) return <p className="text-center text-gray-600">جاري تحميل البيانات...</p>;
    if (error) return <p className="text-center text-red-500">حدث خطأ: {error}</p>;

    if (!Array.isArray(doctors)) {
    return <p className="text-center text-red-500">البيانات غير صحيحة</p>;
    }

    return (
    <div className="w-full p-6 rounded-lg space-y-6">
        <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">الأساتذة</h2>
        <Link to={"/dashboard/Docters/AddDocters"}>
            <button className="bg-orange-500 py-3 px-5 text-white rounded-xl">
            إضافة الأساتذة
            </button>
        </Link>
        </div>

        <div className="overflow-auto max-h-[800px] border rounded-lg" style={{ direction: 'ltr' }}> 
        <table className="w-full border-collapse rounded-lg" style={{ direction: 'rtl' }}>
        <thead>
            <tr className="bg-orange-500 text-white">
            <th className="p-3">اسم الدكتور</th>
            <th className="p-3">العنوان</th>
            <th className="p-3">رقم الهاتف</th>
            <th className="p-3">النوع</th>
            {/* <th className="p-3">السنة الدراسية</th> */}
            <th className="p-3">التخصص</th>
            <th className="p-3">معيد</th>
            <th className="p-3">الإيميل</th>
            <th className="p-3">الراتب</th>
            <th className="p-3">الإجراء</th>
            </tr>
        </thead>
        <tbody>
            {doctors.map((doctor, index) => (
            <tr key={index} className="border-b border-gray-300 hover:bg-gray-100 transition">
                <td className="p-3 text-center">{doctor.name}</td>
                <td className="p-3 text-center">{doctor.address || "غير متوفر"}</td>
                <td className="p-3 text-center">{doctor.phone_number|| "غير متوفر"}</td>
                <td className="p-3 text-center">{doctor.gender || "غير متوفر"}</td>
                {/* <td className="p-3 text-center">{doctor.academicYear || "غير متوفر"}</td> */}
                <td className="p-3 text-center">{doctor.specialist || "غير متوفر"}</td>
                <td className="p-3 text-center">
    {doctor.assistants && doctor.assistants.length > 0
    ? doctor.assistants.map((assistant) => assistant.name).join(" , ")
    : "غير متوفر"}
    </td>

                <td className="p-3 text-center">{doctor.email || "غير متوفر"}</td>
                <td className="p-3 text-center">{doctor.salary || "غير متوفر"}</td>
                <td className="p-3 flex gap-x-3 justify-center text-center">
                <button className="text-blue-500 hover:text-blue-700 transition">
                    <FaEdit className="text-lg" />
                </button>
                <button className="text-red-500 hover:text-red-700 transition">
                    <FaTrash className="text-lg" />
                </button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    </div>
    );
    }
