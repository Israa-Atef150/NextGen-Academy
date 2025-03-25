import React, { useState, useEffect } from "react";
import {useData} from'../DataContext/DataContext '
import { FaEdit, FaTrash,FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
export default function Admin() {
    const { admins, loading, error ,handleDeleteAdmin} = useData(); // ✅ جلب المشرفين من DataContext
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredAdmins, setFilteredAdmins] = useState(admins);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        setFilteredAdmins(admins);
        }, [admins]);
    
        const handleSearch = () => {
            if (searchQuery.trim() === "") {
                setFilteredAdmins(admins);
            } else {
                const filtered = admins.filter((admin) =>
                    admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                admin.id.toString().includes(searchQuery) // البحث في المعرف أيضاً
                );
                setFilteredAdmins(filtered);
            }
        };
    
        const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch(); // تنفيذ البحث عند الضغط على Enter
            setIsExpanded(false); // إغلاق مربع البحث بعد البحث
        }
        };
    if (loading) return <p className="text-center text-gray-500">جارٍ تحميل البيانات...</p>;
    if (error) return <p className="text-center text-red-500">حدث خطأ: {error}</p>;

    return (
        <div className="w-full p-6 rounded-lg space-y-6">
            <ToastContainer position="top-right" autoClose={3000}  />
            {/* العنوان + زر الإضافة */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">المشرفين</h2>
        
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
                        placeholder="ابحث عن مشرف..."
                        className={`transition-all duration-300 outline-none px-3 py-2 bg-transparent text-lg ${
                        isExpanded ? "w-full" : "w-0"
                        }`}
                    />
                    </div>
                </div>
                <Link to={'/dashboard/Admin/AddAdmin'}>
                    <button className="bg-orange-500 py-3 px-5 text-white rounded-xl">إضافة مشرف</button>
                </Link>
            </div>
            <div className="overflow-auto max-h-[800px] border rounded-lg" style={{ direction: 'ltr' }}>
            <table className="w-full border-collapse rounded-lg" style={{ direction: 'rtl' }}>
                <thead>
                    <tr className="bg-orange-500 text-white">
                        <th className="p-3">معرف المشرف</th>
                        <th className="p-3">اسم المشرف</th>
                        <th className="p-3">الإيميل</th>
                        <th className="p-3">الدور</th>
                        <th className="p-3">الإجراء</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAdmins.length > 0 ? (
                        filteredAdmins.map((admin, index) => (
                            <tr key={index} className="border-b border-gray-300 hover:bg-gray-100 transition">
                                <td className="p-3 text-center">{admin.id}</td>
                                <td className="p-3 text-center">{admin.name}</td>
                                <td className="p-3 text-center">{admin.email}</td>
                                <td className="p-3 text-center">{admin.role || "غير محدد"}</td>
                                <td className="p-3 flex gap-x-4 justify-center" style={{alignItems:"baseline"}}>
                                    <Link to={'/dashboard/Admin/AddAdmin'} state={{ admin }}>
                                        <button className='text-blue-500 hover:text-blue-700 transition'>
                                            <FaEdit className='text-lg' />
                                        </button>
                                        </Link>
                                    <button className="text-red-500 hover:text-red-700 transition" onClick={()=>{handleDeleteAdmin(admin.id)}}>
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
