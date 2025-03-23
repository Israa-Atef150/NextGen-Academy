import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: '',
    phone_number: '',
    birth_of_date: '',
    year_study: '',
    gender: '',
    address: '',
    email: ''
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`https://ishraaq.up.railway.app/api/student/${id}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        setStudent(res.data.student);
      } catch (error) {
        console.error("Error fetching student:", error);
        toast.error("فشل في تحميل بيانات الطالب");
      }
    };

    fetchStudent();
  }, [id, token]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://ishraaq.up.railway.app/api/student/${id}/edit`, student, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      toast.success("تم تحديث بيانات الطالب بنجاح!");
      navigate('/dashboard/students');
    } catch (error) {
      console.error("Error updating student:", error);
      toast.error("فشل في تحديث بيانات الطالب");
    }
  };

  return (
    <div className="w-full p-6 rounded-lg space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">تعديل بيانات الطالب</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={student.name} onChange={handleChange} placeholder="الاسم" className="w-full p-2 border rounded" />
        <input type="text" name="phone_number" value={student.phone_number} onChange={handleChange} placeholder="رقم الهاتف" className="w-full p-2 border rounded" />
        <input type="date" name="birth_of_date" value={student.birth_of_date} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="year_study" value={student.year_study} onChange={handleChange} placeholder="السنة الدراسية" className="w-full p-2 border rounded" />
        <input type="text" name="gender" value={student.gender} onChange={handleChange} placeholder="النوع" className="w-full p-2 border rounded" />
        <input type="text" name="address" value={student.address} onChange={handleChange} placeholder="العنوان" className="w-full p-2 border rounded" />
        <input type="email" name="email" value={student.email} onChange={handleChange} placeholder="الإيميل" className="w-full p-2 border rounded" />
        <button type="submit" className="bg-orange-500 py-3 px-5 text-white rounded-xl">حفظ التعديلات</button>
      </form>
    </div>
  );
}
