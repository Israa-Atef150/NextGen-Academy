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
    year_study: "",
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        if (!id) {
          toast.error("لم يتم تحديد معرف الدورة.");
          return;
        }

        const response = await axios.get(
          `https://ishraaq.up.railway.app/api/Cs/course/search?search=${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data?.courses?.length > 0) {
          setCourse(response.data.courses[0]);
        } else {
          toast.warn("لم يتم العثور على بيانات الدورة.");
        }
      } catch (error) {
        console.error("Error fetching course:", error.response?.data || error.message);
        toast.error("حدث خطأ أثناء جلب بيانات الدورة.");
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

    if (!id) {
      toast.error("لا يمكن تحديث الدورة بدون معرف صحيح.");
      return;
    }

    const apiUrl = `https://ishraaq.up.railway.app/api/course/${id}/edit`;

    try {
      await axios.put(apiUrl, course, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("تم تحديث الدورة بنجاح");
    } catch (error) {
      console.error("Error updating course:", error.response?.data || error.message);
      toast.error("حدث خطأ أثناء التحديث");
    }
  };

  return (
    <div className="w-full p-6 bg-white shadow-md rounded-lg space-y-6">
      <ToastContainer />
      <h2 className="text-2xl font-semibold text-gray-800">تعديل الدورة</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">اسم الدورة</label>
          <input
            type="text"
            name="name"
            value={course.name || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">الدكتور</label>
          <input
            type="text"
            name="doctor_id"
            value={course.doctor_id || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">السنة الدراسية</label>
          <input
            type="text"
            name="year_study"
            value={course.year_study || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
          حفظ التعديلات
        </button>
      </form>
    </div>
  );
}
