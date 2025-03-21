    import React, { useState } from "react";
    import axios from "axios";
    import { ToastContainer, toast } from "react-toastify";
    import "react-toastify/dist/ReactToastify.css";
    export default function AddStudent() {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    birth_of_date: "",
    email: "",
    gender: "male",
    address: "",
    year_study: "",
    });

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem("token");
        console.log("📤 البيانات المرسلة:", formData);
        const response = await axios.post("https://ishraaq.up.railway.app/api/student/create", formData, {
        headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 201) {
        setStudents([...students, response.data]);
        setFormData({
            name: "",
            phone_number: "",
            birth_of_date: "",
            email: "",
            gender: "",
            address: "",
            year_study: "",
        });

                toast.success("✅  تمت اضافة طلاب بنجاح", {
                    position: "top-right",
                    autoClose: 2000, // يغلق بعد 3 ثواني
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            console.log("📤 البيانات المرسلة:", formData);
        } else{
        alert(" الايميل او الرقم موجودي بالفعل ")
        // console.log("🔹 التوكن المستخدم:", token);
        console.log("📤 البيانات المرسلة:", formData);
        }
    } catch (error) {
            toast.error("⚠️ حدث خطأ أثناء الإضافة، تأكد من صحة البيانات!", {
                position: "top-right",
                autoClose: 5000, // 5 ثواني
            });
        console.log("📤 البيانات المرسلة:", formData);
    }
    };

    return (
    <div className="p-6">
        <ToastContainer icon={false} />
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-right">إضافة طالب جديد</h3>
        <form onSubmit={handleAddStudent} className="grid grid-cols-2 gap-4 bg-white p-6 shadow-md rounded-lg">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="الاسم" required className="border p-2 w-full rounded-md" />
        <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="رقم الهاتف" required className="border p-2 w-full rounded-md" />
        <input type="date" name="birth_of_date" value={formData.birth_of_date} onChange={handleChange} required className="border p-2 w-full rounded-md" />
        <input type="text" name="year_study" value={formData.year_study} onChange={handleChange} placeholder="السنة الدراسية" required className="border p-2 w-full rounded-md" />
        <select name="gender" value={formData.gender} onChange={handleChange} className="border p-2 w-full rounded-md">
            <option value="male">ذكر</option>
            <option value="female">أنثى</option>
        </select>
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="العنوان" required className="border p-2 w-full rounded-md" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="البريد الإلكتروني" required className="border p-2 w-full col-span-2 rounded-md" />
        <button type="submit" className="bg-[#28A745] text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition col-span-2">إضافة</button>
        </form>
    </div>
    );
    }