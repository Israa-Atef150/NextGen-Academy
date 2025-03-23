import React, { useState, useEffect } from 'react';
import {useData} from '../DataContext/DataContext '
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddAdmin() {
    const { createAdmin, updateAdmin } = useData();
    const navigate = useNavigate();
    const location = useLocation();
    const adminToEdit = location.state?.admin; // ✅ استلام بيانات المشرف عند التعديل

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "User"
    });

    // ✅ تحميل بيانات المشرف عند التعديل
    useEffect(() => {
        if (adminToEdit) {
            setFormData({
                name: adminToEdit.name || "",
                email: adminToEdit.email || "",
                password: "", // ⚠️ لا يُفضل عرض كلمة المرور الحالية
                role: adminToEdit.role || "user"
            });
        }
    }, [adminToEdit]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (adminToEdit) {
                await updateAdmin(adminToEdit.id, formData);
                toast.success("✅ تم تحديث الببانات  مشرف بنجاح   !", {
                    icon: false
                });
            } else {
                await createAdmin(formData);
                toast.success("✅ تمت إضافة مشرف بنجاح!",{
                    icon: false
                });
            }
        } catch (error) {
            toast.error("⚠️ حدث خطأ أثناء الحفظ، تأكد من صحة البيانات!");
            console.error("❌ خطأ:", error.response?.data || error);
        }
    };

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <ToastContainer />
            <h3 className="text-lg font-semibold mb-4 text-right">
                {adminToEdit ? "تعديل بيانات المشرف" : "إضافة مشرف"}
            </h3>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-right"
                    placeholder="الاسم"
                    required
                />

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-right"
                    placeholder="البريد الإلكتروني"
                    required
                />

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-right"
                    placeholder="كلمة المرور"
                    required={!adminToEdit} // ✅ عند التعديل، يمكن تركه فارغًا
                />

                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-right"
                    required
                >
                    <option value="User">user</option>
                    <option value="Admin">Admin</option>
                </select>

                <button type="submit" className="bg-green-500 text-white p-2 rounded-lg w-full">
                    {adminToEdit ? "تحديث" : "إضافة"}
                </button>
            </form>
        </div>
    );
}
