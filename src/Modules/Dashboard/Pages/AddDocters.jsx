import React, { useState, useEffect } from 'react';
import {useData} from'../DataContext/DataContext '
import { FaCalendarAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddDoctor() {
    const { createDoctor, updateDoctor, getDoctors } = useData();
    const navigate = useNavigate();
    const location = useLocation(); 
    const doctorToEdit = location.state?.doctor; // البيانات القادمة من الصفحة السابقة عند التعديل

    const [doctorData, setDoctorData] = useState({
        name: "", phone: "", birthDate: "", email: "",
        salary: "", specialty: "", gender: "male", address: "", assistants: ""
    });

    // تحديث الحقول عند تعديل طبيب
    useEffect(() => {
        if (doctorToEdit) {
            setDoctorData({
                name: doctorToEdit.name || "",
                phone: doctorToEdit.phone_number || "",
                birthDate: doctorToEdit.birth_of_date || "",
                email: doctorToEdit.email || "",
                salary: doctorToEdit.salary ? String(doctorToEdit.salary) : "",
                specialty: doctorToEdit.specialist || "",
                gender: doctorToEdit.gender || "male",
                address: doctorToEdit.address || "",
                assistants: doctorToEdit.assistant_ids ? doctorToEdit.assistant_ids.join(", ") : ""
            });
        }
    }, [doctorToEdit]);

    const handleChange = (e) => {
        setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedData = {
            name: doctorData.name,
            phone_number: doctorData.phone,
            birth_of_date: doctorData.birthDate,
            email: doctorData.email,
            salary: Number(doctorData.salary),
            specialist: doctorData.specialty,
            gender: doctorData.gender,
            address: doctorData.address,
            assistant_ids: doctorData.assistants
                ? doctorData.assistants.split(',').map(id => Number(id.trim()))
                : []
        };

        try {
            if (doctorToEdit) {
                await updateDoctor(doctorToEdit.id, formattedData);
                toast.success("✅ تم تحديث الببانات الاستاذ بنجاح   !", {
                    icon: false
                });
            } else {
                await createDoctor(formattedData);
                toast.success("✅ تمت اضافة استاذ بنجاح   !", {
                    icon: false
                });
            }

            getDoctors();
        } catch (error) {
            console.error("❌ خطأ:", error.response?.data || error);
            toast.error("⚠️ حدث خطأ أثناء الحفظ، تأكد من صحة البيانات!");
        }
    };

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <ToastContainer />
            <h3 className="text-lg font-semibold mb-4 text-right">
                {doctorToEdit ? "تعديل بيانات دكتور" : "إضافة دكتور جديد"}
            </h3>
            <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="الاسم" value={doctorData.name} onChange={handleChange} className="border border-gray-300 p-2 rounded-md text-right w-full" />
                <input type="text" name="phone" placeholder="رقم الهاتف" value={doctorData.phone} onChange={handleChange} className="border border-gray-300 p-2 rounded-md text-right w-full" />
                <div className="relative w-full">
                    <input type="text" name="birthDate" placeholder="تاريخ الميلاد (YYYY-MM-DD)" value={doctorData.birthDate} onChange={handleChange} className="border border-gray-300 p-2 rounded-md text-right w-full" />
                    <FaCalendarAlt className="absolute left-3 top-3 text-gray-500" />
                </div>
                <input type="email" name="email" placeholder="البريد الإلكتروني" value={doctorData.email} onChange={handleChange} className="border border-gray-300 p-2 rounded-md text-right w-full" />
                <input type="number" name="salary" placeholder="الراتب" value={doctorData.salary} onChange={handleChange} className="border border-gray-300 p-2 rounded-md text-right w-full" />
                <input type="text" name="specialty" placeholder="التخصص" value={doctorData.specialty} onChange={handleChange} className="border border-gray-300 p-2 rounded-md text-right w-full" />
                <select name="gender" value={doctorData.gender || ""} onChange={handleChange} className="border border-gray-300 p-2 rounded-md text-right w-full">
                    <option value="male">ذكر</option>
                    <option value="female">أنثى</option>
                </select>
                <input type="text" name="address" placeholder="العنوان" value={doctorData.address} onChange={handleChange} className="border border-gray-300 p-2 rounded-md text-right w-full" />
                <input type="text" name="assistants" placeholder="معرفات المساعدين (مثال: 1, 3, 5)" value={doctorData.assistants} onChange={handleChange} className="border border-gray-300 p-2 rounded-md text-right w-full" />
                <button type="submit" className="col-span-2 bg-green-500 text-white p-2 rounded-md w-full">
                    {doctorToEdit ? "تحديث" : "إضافة"}
                </button>
            </form>
        </div>
    );
}
