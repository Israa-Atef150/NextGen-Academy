import React, { useState, useEffect } from 'react';
import {useData} from '../DataContext/DataContext '
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddCourses() {
  const { updateCouressCouress, createCouress, getCourses } = useData();

  const navigate = useNavigate();
  const location = useLocation(); 
  const courseToEdit = location.state?.course; 


  const [courseData, setCourseData] = useState({
    name: "",
    doctor_id: "",
    year_study: "",
    Path_of_Video: "",  // ✅ استخدم الاسم كما هو في الـ Backend
    student_st_year: "",
    code_of_course:""
  });




useEffect(() => {
  if (courseToEdit) {
      setCourseData({
          name: courseToEdit.name || "",
          doctor_id: courseToEdit.doctor_id || "",
          year_study: courseToEdit.year_study || "",
          Path_of_Video: courseToEdit.Path_of_Video || "", // ✅ الاسم مطابق للـ Backend
          student_st_year: courseToEdit.student_st_year || "",
          code_of_course: courseToEdit.code_of_course || ""
      });
  }
}, [courseToEdit]);



  
const handleChange = (e) => {
  setCourseData((prev) => ({
    ...prev,
    [e.target.name]: e.target.value
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
      const newCourse = {
          name: courseData.name,
          doctor_id: courseData.doctor_id,
          year_study: courseData.year_study,
          Path_of_Video: courseData.Path_of_Video, // ✅ الاسم مطابق للـ Backend
          student_st_year: courseData.student_st_year,
          code_of_course:courseData.code_of_course
      };

      console.log("📤 إرسال البيانات:", newCourse); // ✅ طباعة البيانات قبل الإرسال

      if (courseToEdit) {
          await updateCouressCouress(courseToEdit.id, newCourse);
          toast.success("✅ تم تحديث بيانات الدورة بنجاح!");
      } else {
          await createCouress(newCourse);
          toast.success("✅ تمت إضافة الدورة بنجاح!");
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
        {courseToEdit ? "تعديل بيانات الدورة" : "إضافة دورة جديدة"}
      </h3>
      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
      <input type='text' name='name' placeholder='اسم الدورة' value={courseData.name} onChange={handleChange} className='border border-gray-300 p-2 rounded-md text-right w-full' />
      <input type='text' name='doctor_id' placeholder='كود الدكتور' value={courseData.doctor_id} onChange={handleChange} className='border border-gray-300 p-2 rounded-md text-right w-full' />
      <input type='text' name='year_study' placeholder='السنة الدراسية' value={courseData.year_study} onChange={handleChange} className='border border-gray-300 p-2 rounded-md text-right w-full' />
      <input 
      type='text' 
      name='Path_of_Video' // ✅ يجب أن يكون مطابقًا للحقل في useState
      placeholder='مسار الفيديو' 
      value={courseData.Path_of_Video}  
      onChange={handleChange} 
      className='border border-gray-300 p-2 rounded-md text-right w-full' 
      />
      <input type='text' name='student_st_year' placeholder='سنة الطالب الدراسية' value={courseData.student_st_year} onChange={handleChange} className='border border-gray-300 p-2 rounded-md text-right w-full' />
      <input type='text' name='code_of_course' placeholder='sku' value={courseData.code_of_course} onChange={handleChange} className='border border-gray-300 p-2 rounded-md text-right w-full' />
        <button type="submit" className="col-span-2 bg-green-500 text-white p-2 rounded-md w-full">
          {courseToEdit ? "تحديث" : "إضافة"}
        </button>
      </form>
    </div>
  );
}