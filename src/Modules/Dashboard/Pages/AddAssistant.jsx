import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {useData} from '../DataContext/DataContext '
import { ToastContainer, toast } from "react-toastify";
import { FaCalendarAlt } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import {  useNavigate } from "react-router-dom";

export default function AddAssistant() {
    const location = useLocation();
    const assistantToEdit = location.state?.assistant || null;
    const { createAssistant, updateAssistant } = useData();
    
const navigate = useNavigate();

    const [assistantData, setAssistantData] = useState({
        name: "",
        phone_number: "",
        birth_of_date: "",
        email: "",
        salary: "",
        specialist: "",
        gender: "male",
        address: "",
        doctor_id: "",
        student_ids: "",
        course_ids: "",
    });

    // ✅ تعبئة البيانات تلقائيًا عند التعديل
    useEffect(() => {
        if (assistantToEdit) {
            setAssistantData({
                name: assistantToEdit.name || "",
                phone_number: assistantToEdit.phone_number || "",
                birth_of_date: assistantToEdit.birth_of_date || "",
                email: assistantToEdit.email || "",
                salary: assistantToEdit.salary || "",
                specialist: assistantToEdit.specialist || "",
                gender: assistantToEdit.gender || "male",
                address: assistantToEdit.address || "",
                doctor_id: assistantToEdit.doctor_id || "",
                student_ids: assistantToEdit.student_ids?.join(", ") || "",
                course_ids: assistantToEdit.course_ids?.join(", ") || "",
            });
        }
    }, [assistantToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAssistantData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = {
            name: assistantData.name,
            phone_number: assistantData.phone_number,
            birth_of_date: assistantData.birth_of_date,
            email: assistantData.email,
            salary: Number(assistantData.salary),
            specialist: assistantData.specialist,
            gender: assistantData.gender,
            address: assistantData.address,
            doctor_id: assistantData.doctor_id ? Number(assistantData.doctor_id) : null,
            student_ids: assistantData.student_ids ? assistantData.student_ids.split(",").map(Number) : [],
            course_ids: assistantData.course_ids ? assistantData.course_ids.split(",").map(Number) : [],
        };

        try {
            if (assistantToEdit) {
                await updateAssistant(assistantToEdit.id, formattedData);
                toast.success("✅ تم تحديث بيانات المعيد بنجاح");
            } else {
                await createAssistant(formattedData);
                toast.success("✅ تمت إضافة معيد جديد بنجاح");
            }
        } catch (error) {
            console.error("❌ خطأ:", error.response?.data || error);
            toast.error("⚠️ حدث خطأ أثناء العملية، تأكد من صحة البيانات!");
        }
    };

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <ToastContainer icon={false} />
            <h3 className="text-lg font-semibold mb-4 text-right">
                {assistantToEdit ? "تعديل بيانات المعيد" : "إضافة مساعد جديد"}
            </h3>
            <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="الاسم" value={assistantData.name} onChange={handleChange} className="border border-gray-300 p-2 rounded-md text-right w-full"/>
                <input type="text" name="phone_number" placeholder="رقم الهاتف" value={assistantData.phone_number} onChange={handleChange} className="border border-gray-300 p-2 rounded-md text-right w-full"/>
                <div className="relative w-full">
                    <input type="text" name="birth_of_date" placeholder="تاريخ الميلاد (YYYY-MM-DD)" value={assistantData.birth_of_date} onChange={handleChange} className="border border-gray-300 p-2 rounded-md text-right w-full"/>
                    <FaCalendarAlt className="absolute left-3 top-3 text-gray-500" />
                </div>
                <input type="email" name="email" placeholder="البريد الإلكتروني" value={assistantData.email} onChange={handleChange} className="border border-gray-300 p-2 rounded-md text-right w-full"/>
                <input type="number" name="salary" placeholder="الراتب" value={assistantData.salary} onChange={handleChange} className="border border-gray-300 p-2 rounded-md text-right w-full"/>
                <input type="text" name="specialist" placeholder="التخصص" value={assistantData.specialist} onChange={handleChange} className="border border-gray-300 p-2 rounded-md text-right w-full"/>
                <select name="gender" value={assistantData.gender} onChange={handleChange} className="border border-gray-300 p-2 rounded-md text-right w-full">
                    <option value="male">ذكر</option>
                    <option value="female">أنثى</option>
                </select>
                <input type="text" name="address" placeholder="العنوان" value={assistantData.address} onChange={handleChange} className="border border-gray-300 p-2 rounded-md text-right w-full"/>
                <input type="text" name="doctor_id" placeholder="رقم الدكتور" value={assistantData.doctor_id} onChange={handleChange} className="border border-gray-300 p-2 rounded-md text-right w-full"/>
                <input type="text" name="student_ids" placeholder="معرفات الطلاب (مثال: 1, 3, 5)" value={assistantData.student_ids} onChange={handleChange} className="border border-gray-300 p-2 rounded-md text-right w-full"/>
                <input type="text" name="course_ids" placeholder="معرفات الدورات (مثال: 4, 7)" value={assistantData.course_ids} onChange={handleChange} className="border border-gray-300 p-2 rounded-md text-right w-full"/>
                <button type="submit" className="col-span-2 bg-green-500 text-white p-2 rounded-md w-full">
                    {assistantToEdit ? "تحديث البيانات" : "إضافة"}
                </button>
            </form>
        </div>
    );
}
