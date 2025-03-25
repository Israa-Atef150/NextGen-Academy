import React, { useState, useEffect } from "react";
import {useData} from '../DataContext/DataContext '
import { FaCalendarAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddStudent() {
    const { createstudents, updatestudents, getstudents } = useData();
    const navigate = useNavigate();
    const location = useLocation();
    const studentToEdit = location.state?.student;

    const [studentData, setStudentData] = useState({
        name: "",
        phone_number: "",
        birth_of_date: "",
        email: "",
        gender: "male",
        address: "",
        year_study: ""
    });

    useEffect(() => {
        if (studentToEdit) {
            setStudentData({
                name: studentToEdit.name || "",
                phone_number: studentToEdit.phone_number || "",
                birth_of_date: studentToEdit.birth_of_date || "",
                email: studentToEdit.email || "",
                gender: studentToEdit.gender || "male",
                address: studentToEdit.address || "",
                year_study: studentToEdit.year_study || "",
            });
        }
    }, [studentToEdit]);

    const handleChange = (e) => {
        setStudentData({ ...studentData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (studentToEdit) {
                await updatestudents(studentToEdit.id, studentData);
            } else {
                await createstudents(studentData);
                toast.success("✅ تم إضافة الطالب بنجاح!", { icon: false });
            }
        } catch (error) {
            console.error("❌ خطأ:", error.response?.data || error);
            toast.error("⚠️ حدث خطأ أثناء الحفظ، تأكد من صحة البيانات!");
        }
    };


    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <ToastContainer />
            <h3 className="text-lg font-semibold mb-4 text-right">
                {studentToEdit ? "تعديل بيانات الطالب" : "إضافة طالب جديد"}
            </h3>
            <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="الاسم" value={studentData.name} onChange={handleChange} className="border border-gray-300 p-2 rounded-md text-right w-full" />
                <input type="text" name="phone_number" placeholder="رقم الهاتف" value={studentData.phone_number} onChange={handleChange} className="border border-gray-300 p-2 rounded-md text-right w-full" />
                <div className="relative w-full">
                    <input type="text" name="birth_of_date" placeholder="تاريخ الميلاد (YYYY-MM-DD)" value={studentData.birth_of_date} onChange={handleChange} className="border border-gray-300 p-2 rounded-md text-right w-full" />
                    <FaCalendarAlt className="absolute left-3 top-3 text-gray-500" />
                </div>
                <input type="email" name="email" placeholder="البريد الإلكتروني" value={studentData.email} onChange={handleChange} className="border border-gray-300 p-2 rounded-md text-right w-full" />
                <select name="gender" value={studentData.gender} onChange={handleChange} className="border border-gray-300 p-2 rounded-md text-right w-full">
                    <option value="male">ذكر</option>
                    <option value="female">أنثى</option>
                </select>
                <input type="text" name="address" placeholder="العنوان" value={studentData.address} onChange={handleChange} className="border border-gray-300 p-2 rounded-md text-right w-full" />
                <input type="text" name="year_study" placeholder="السنة الدراسية" value={studentData.year_study} onChange={handleChange} className="border border-gray-300 p-2 rounded-md text-right w-full" />
                <button type="submit" className="col-span-2 bg-green-500 text-white p-2 rounded-md w-full">
                    {studentToEdit ? "تحديث" : "إضافة"}
                </button>
            </form>
        </div>
    );
}