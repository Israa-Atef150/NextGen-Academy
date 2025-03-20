import React, { useState } from 'react';
import {useData} from'../DataContext/DataContext '
import { FaCalendarAlt } from "react-icons/fa";

export default function AddDoctor() {
    const { createDoctor, getDoctors } = useData(); // ✅ جلب الدالة من الكونتكست
    const [doctorData, setDoctorData] = useState({
        name: "", phone: "", birthDate: "", email: "",
        salary: "", specialty: "", gender: "", address: "", assistants: ""
    });

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
                ? doctorData.assistants.split(',').map(Number)
                : []
        };

        try {
            await createDoctor(formattedData);
            alert("تمت إضافة الدكتور بنجاح!");
            getDoctors(); // ✅ إعادة تحميل قائمة الأطباء بعد الإضافة
        } catch (error) {
            alert("حدث خطأ أثناء الإضافة. حاول مرة أخرى.");
        }
    };

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-right">إضافة دكتور جديد</h3>
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
                <input type="text" name="gender" placeholder="النوع (ذكر / أنثى)" value={doctorData.gender} onChange={handleChange} className="border border-gray-300 p-2 rounded-md text-right w-full" />
                <input type="text" name="address" placeholder="العنوان" value={doctorData.address} onChange={handleChange} className="border border-gray-300 p-2 rounded-md text-right w-full" />
                <input type="text" name="assistants" placeholder="معرفات المساعدين (مثال: 1, 3, 5)" value={doctorData.assistants} onChange={handleChange} className="border border-gray-300 p-2 rounded-md text-right w-full" />
                <button type="submit" className="col-span-2 bg-green-500 text-white p-2 rounded-md w-full">إضافة</button>
            </form>
        </div>
    );
}
