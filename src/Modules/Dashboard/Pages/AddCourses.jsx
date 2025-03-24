import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddCourses() {
  const [courseName, setCourseName] = useState("");
  const [doctorCode, setDoctorCode] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [video, setVideo] = useState(null);

  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("⚠️ لا يوجد توكن، يرجى تسجيل الدخول", { position: "top-right" });
      return;
    }

    const formData = new FormData();
    formData.append("name", courseName);
    formData.append("doctor_id", doctorCode);
    formData.append("year_study", academicYear);
    if (video) formData.append("video", video);

    try {
      await axios.post("https://ishraaq.up.railway.app/api/course/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("✅ تمت إضافة الدورة بنجاح", { position: "top-right", autoClose: 2000 });

      setCourseName("");
      setDoctorCode("");
      setAcademicYear("");
      setVideo(null);
    } catch (error) {
      console.error("خطأ أثناء إضافة الدورة:", error);
      toast.error("⚠️ حدث خطأ أثناء الإضافة، تأكد من صحة البيانات!", { position: "top-right" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg shadow-md w-96 mb-8">
        <h3 className="text-2xl font-semibold text-center text-gray-700 mb-4">إضافة دورة</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)}
            placeholder="اسم الدورة" required className="w-full px-3 py-2 border rounded-lg" />
          
          <input type="text" value={doctorCode} onChange={(e) => setDoctorCode(e.target.value)}
            placeholder="كود الدكتور" required className="w-full px-3 py-2 border rounded-lg" />
          
          <input type="text" value={academicYear} onChange={(e) => setAcademicYear(e.target.value)}
            placeholder="السنة الدراسية" required className="w-full px-3 py-2 border rounded-lg" />
          
          <input type="file" accept="video/*" onChange={handleFileChange} className="w-full px-3 py-2 border rounded-lg" />

          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg">
            إضافة الدورة
          </button>
        </form>
      </div>
    </div>
  );
}
