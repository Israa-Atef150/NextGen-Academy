import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx"; // استيراد مكتبة إنشاء Excel
import {useData} from '../DataContext/DataContext '
import { FaEdit, FaTrash, FaSearch, FaFileExcel } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function Docters() {
const { doctors, loading, error, handleDeleteDoctor } = useData();
const [searchQuery, setSearchQuery] = useState("");
const [filteredDoctors, setFilteredDoctors] = useState(doctors);
const [isExpanded, setIsExpanded] = useState(false);

useEffect(() => {
setFilteredDoctors(doctors);
}, [doctors]);

const handleSearch = () => {
if (searchQuery.trim() === "") {
    setFilteredDoctors(doctors);
} else {
    const filtered = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.id.toString().includes(searchQuery)
    );
    setFilteredDoctors(filtered);
}
};

const handleKeyDown = (e) => {
if (e.key === "Enter") {
    handleSearch();
    setIsExpanded(false);
}
};

// دالة تصدير البيانات إلى Excel
const exportToExcel = () => {
const worksheet = XLSX.utils.json_to_sheet(
    filteredDoctors.map((doctor) => ({
    "معرف": doctor.id,
    "اسم الدكتور": doctor.name,
    "العنوان": doctor.address || "غير متوفر",
    "رقم الهاتف": doctor.phone_number || "غير متوفر",
    "النوع": doctor.gender || "غير متوفر",
    "التخصص": doctor.specialist || "غير متوفر",
    "معيد": doctor.assistants?.map((a) => a.name).join(" , ") || "غير متوفر",
    "الإيميل": doctor.email || "غير متوفر",
    "الراتب": doctor.salary || "غير متوفر",
    }))
);

const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Doctors");
XLSX.writeFile(workbook, "doctors_list.xlsx");
};

if (loading) return <p className="text-center text-gray-600">جاري تحميل البيانات...</p>;
if (error) return <p className="text-center text-red-500">حدث خطأ: {error}</p>;
if (!Array.isArray(doctors)) return <p className="text-center text-red-500">البيانات غير صحيحة</p>;

return (
<div className="w-full p-6 rounded-lg space-y-6">
    <ToastContainer position="top-right" autoClose={3000} />

    <div className="flex justify-between items-center">
    <h2 className="text-2xl font-semibold text-gray-800">الأساتذة</h2>

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
            placeholder="ابحث عن أستاذ..."
            className={`transition-all duration-300 outline-none px-3 py-2 bg-transparent text-lg ${
            isExpanded ? "w-full" : "w-0"
            }`}
        />
        </div>
    </div>

    <div className="flex gap-4">
        <Link to={"/dashboard/Docters/AddDocters"}>
        <button className="bg-orange-500 py-3 px-5 text-white rounded-xl">
            إضافة الأساتذة
        </button>
        </Link>

        {/* زر تصدير إلى Excel */}
        <button onClick={exportToExcel} className="bg-green-500 flex items-center py-3 px-5 text-white rounded-xl">
        <FaFileExcel className="ml-2" /> تصدير إلى Excel
        </button>
    </div>
    </div>

    <div className="overflow-auto max-h-[760px] border rounded-lg" style={{ direction: "ltr" }}>
    <table className="w-full border-collapse rounded-lg" style={{ direction: "rtl" }}>
        <thead>
        <tr className="bg-orange-500 text-white">
            <th className="p-3">معرف</th>
            <th className="p-3">اسم الدكتور</th>
            <th className="p-3">العنوان</th>
            <th className="p-3">رقم الهاتف</th>
            <th className="p-3">النوع</th>
            <th className="p-3">التخصص</th>
            <th className="p-3">معيد</th>
            <th className="p-3">الإيميل</th>
            <th className="p-3">الراتب</th>
            <th className="p-3">الإجراء</th>
        </tr>
        </thead>
        <tbody>
        {filteredDoctors.map((doctor, index) => (
            <tr key={index} className="border-b border-gray-300 hover:bg-gray-100 transition">
            <td className="p-3 text-center">{doctor.id}</td>
            <td className="p-3 text-center">{doctor.name}</td>
            <td className="p-3 text-center">{doctor.address || "غير متوفر"}</td>
            <td className="p-3 text-center">{doctor.phone_number || "غير متوفر"}</td>
            <td className="p-3 text-center">{doctor.gender || "غير متوفر"}</td>
            <td className="p-3 text-center">{doctor.specialist || "غير متوفر"}</td>
            <td className="p-3 text-center">
                {doctor.assistants?.map((a) => a.name).join(" , ") || "غير متوفر"}
            </td>
            <td className="p-3 text-center">{doctor.email || "غير متوفر"}</td>
            <td className="p-3 text-center">{doctor.salary || "غير متوفر"}</td>
            <td className="p-3 flex gap-x-3 justify-center text-center" style={{ alignItems: "baseline" }}>
                <Link to={"/dashboard/Docters/AddDocters"} state={{ doctor }}>
                <button className="text-blue-500 hover:text-blue-700 transition">
                    <FaEdit className="text-lg" />
                </button>
                </Link>
                <button
                className="text-red-500 hover:text-red-700 transition"
                onClick={() => handleDeleteDoctor(doctor.id)}
                >
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
