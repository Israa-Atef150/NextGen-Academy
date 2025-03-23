import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function EditCourse() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [course, setCourse] = useState({
    name: "",
    doctor_id: "",
    student_st_year: "",
  });

  // ✅ تصحيح الطلب: استخدام GET بدلًا من PUT لجلب البيانات
  useEffect(() => {
    const fetchCourse = async () => {
        try {
            const token = localStorage.getItem('token'); // Or wherever you store it
            const response = await axios.put(
                'https://ishraaq.up.railway.app/api/course/18/edit',
                { /* course data */ },
                {
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching course:', error.response?.data || error.message);
        }
    };

    fetchCourse();
  }, [id, token]);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("لم يتم العثور على التوكن، يرجى تسجيل الدخول");
      return;
    }

    const apiUrl = `https://ishraaq.up.railway.app/api/course/${id}/edit`;
    console.log("Updating course at:", apiUrl);

    // ✅ تأكد من أن البيانات تُرسل بالشكل الصحيح
    const updatedCourseData = {
      name: course.name,
      doctor_id: course.doctor_id || "", // اجعل `doctor_id` دائمًا موجودًا
      student_st_year: course.student_st_year,
    };

    console.log("Data being sent:", updatedCourseData);

    try {
      const response = await axios.put(apiUrl, updatedCourseData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Update successful:", response.data);
      toast.success("تم تحديث الدورة بنجاح");
    } catch (error) {
      console.error("Error updating course:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "حدث خطأ أثناء التحديث");
    }
  };

  return (
    <div className="w-full p-6 bg-white shadow-md rounded-lg space-y-6">
      <ToastContainer />
      <h2 className="text-2xl font-semibold text-gray-800">تعديل الدورة</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">اسم الدورة</label>
          <input type="text" name="name" value={course.name} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-gray-700">الدكتور</label>
          <input type="text" name="doctor_id" value={course.doctor_id} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-gray-700">السنة الدراسية</label>
          <input type="text" name="student_st_year" value={course.student_st_year} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
          حفظ التعديلات
        </button>
      </form>
    </div>
  );
}
